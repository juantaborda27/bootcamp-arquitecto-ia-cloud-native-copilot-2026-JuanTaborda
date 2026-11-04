from __future__ import annotations

import httpx
from fastapi import APIRouter, HTTPException, Query, status
from langchain_core.messages import HumanMessage
from pydantic import BaseModel, Field

from src.agent.graph import agent, mermaid_graph
from src.agent.guard import PromptRejectedError, sanitize_prompt
from src.agent.ollama_client import DEFAULT_OLLAMA_MODEL, generate as ollama_generate

router = APIRouter(prefix="/agent", tags=["agent"])


class AgentQuery(BaseModel):
    prompt: str = Field(min_length=1, max_length=2000)


class AgentResponse(BaseModel):
    response: str
    nodes: list[str]


@router.post("/query", response_model=AgentResponse)
async def query_agent(
    body: AgentQuery | None = None,
    prompt: str | None = Query(default=None, description="Prompt de laboratorio (alternativa al JSON)"),
):
    raw = body.prompt if body is not None else prompt
    try:
        sanitized = sanitize_prompt(raw)
    except PromptRejectedError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error

    result = await agent.ainvoke(
        {"messages": [HumanMessage(content=sanitized)], "nodes_visited": []}
    )
    last = result["messages"][-1]
    content = getattr(last, "content", "") or ""
    return AgentResponse(response=str(content), nodes=list(result.get("nodes_visited", [])))


@router.get("/graph")
def agent_graph() -> dict[str, str]:
    return {"mermaid": mermaid_graph()}


class OllamaGenerateRequest(BaseModel):
    model: str = DEFAULT_OLLAMA_MODEL
    prompt: str = Field(min_length=1, max_length=2000)
    stream: bool = False


@router.post("/generate")
def generate_with_ollama(body: OllamaGenerateRequest):
    try:
        sanitized = sanitize_prompt(body.prompt)
    except PromptRejectedError as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error)) from error

    try:
        return ollama_generate(prompt=sanitized, model=body.model, stream=body.stream)
    except httpx.HTTPError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Ollama no respondió en localhost:11434 ({error})",
        ) from error
