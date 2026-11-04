from __future__ import annotations

import os
import operator
from typing import Annotated, Any, Literal, TypedDict

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, ToolMessage
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode

from src.agent.ollama_client import (
    ollama_host,
    ollama_model,
    ollama_reachable,
    should_use_scripted_llm,
)
from src.agent.tools import AGENT_TOOLS


class AgentState(TypedDict):
    messages: Annotated[list, operator.add]
    nodes_visited: Annotated[list[str], operator.add]


class ScriptedEnrollmentLlm:
    """LLM de laboratorio: emite tool calls reales cuando Azure OpenAI no está configurado."""

    def bind_tools(self, _tools: list[Any]) -> "ScriptedEnrollmentLlm":
        return self

    def invoke(self, messages: list[BaseMessage], **_kwargs: Any) -> AIMessage:
        last = messages[-1]
        if isinstance(last, ToolMessage) or getattr(last, "type", "") == "tool":
            payloads = [
                str(item.content)
                for item in messages
                if isinstance(item, ToolMessage) or getattr(item, "type", "") == "tool"
            ]
            joined = "\n".join(payloads)
            return AIMessage(content=f"Enrollment report based on system data:\n{joined}")

        text = ""
        if isinstance(last, HumanMessage):
            text = last.content if isinstance(last.content, str) else str(last.content)
        lowered = text.lower()
        tool_name = "get_user_count" if ("how many" in lowered or "count" in lowered) else "get_active_users"
        return AIMessage(
            content="",
            tool_calls=[{"name": tool_name, "args": {}, "id": f"call_{tool_name}"}],
        )

    async def ainvoke(self, messages: list[BaseMessage], **kwargs: Any) -> AIMessage:
        return self.invoke(messages, **kwargs)


def _build_llm() -> Any:
    deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT")
    endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
    api_key = os.getenv("AZURE_OPENAI_KEY") or os.getenv("AZURE_OPENAI_API_KEY")
    api_version = os.getenv("OPENAI_API_VERSION", "2024-10-21")

    if deployment and endpoint and api_key:
        from langchain_openai import AzureChatOpenAI

        return AzureChatOpenAI(
            azure_deployment=deployment,
            azure_endpoint=endpoint,
            api_key=api_key,
            api_version=api_version,
        ).bind_tools(AGENT_TOOLS)

    if not should_use_scripted_llm() and ollama_reachable():
        from langchain_openai import ChatOpenAI

        return ChatOpenAI(
            model=ollama_model(),
            base_url=f"{ollama_host()}/v1",
            api_key="ollama",
            temperature=0,
        ).bind_tools(AGENT_TOOLS)

    return ScriptedEnrollmentLlm()


llm = _build_llm()


tool_node = ToolNode(AGENT_TOOLS)


def call_llm(state: AgentState) -> dict[str, Any]:
    response = llm.invoke(state["messages"])
    return {"messages": [response], "nodes_visited": ["call_llm"]}


def run_tools(state: AgentState) -> dict[str, Any]:
    result = tool_node.invoke(state)
    result["nodes_visited"] = ["run_tools"]
    return result


def should_continue(state: AgentState) -> Literal["run_tools", "evaluate_result"]:
    last = state["messages"][-1]
    tool_calls = getattr(last, "tool_calls", None)
    if tool_calls:
        return "run_tools"
    return "evaluate_result"


def evaluate_result(state: AgentState) -> dict[str, Any]:
    last = state["messages"][-1]
    content = getattr(last, "content", "") or ""
    if isinstance(content, list):
        content = "".join(str(part) for part in content)
    if not str(content).strip():
        return {
            "messages": [AIMessage(content="No report generated from system tools.")],
            "nodes_visited": ["evaluate_result"],
        }
    return {"nodes_visited": ["evaluate_result"]}


def build_agent():
    graph = StateGraph(AgentState)
    graph.add_node("call_llm", call_llm)
    graph.add_node("run_tools", run_tools)
    graph.add_node("evaluate_result", evaluate_result)
    graph.add_edge(START, "call_llm")
    graph.add_conditional_edges("call_llm", should_continue)
    graph.add_edge("run_tools", "call_llm")
    graph.add_edge("evaluate_result", END)
    return graph.compile()


agent = build_agent()


def mermaid_graph() -> str:
    return agent.get_graph().draw_mermaid()
