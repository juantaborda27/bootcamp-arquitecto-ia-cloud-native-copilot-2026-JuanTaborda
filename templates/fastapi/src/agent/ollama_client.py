"""Cliente Ollama local. No sustituye Azure ni el LLM scripted de pruebas."""

from __future__ import annotations

import os
import sys

import httpx

DEFAULT_OLLAMA_HOST = "http://localhost:11434"
DEFAULT_OLLAMA_MODEL = "qwen3:1.7b"


def ollama_host() -> str:
    return (os.getenv("OLLAMA_HOST") or DEFAULT_OLLAMA_HOST).rstrip("/")


def ollama_model() -> str:
    return os.getenv("OLLAMA_MODEL") or DEFAULT_OLLAMA_MODEL


def ollama_reachable(timeout_seconds: float = 1.5) -> bool:
    try:
        response = httpx.get(f"{ollama_host()}/api/tags", timeout=timeout_seconds)
        return response.status_code == 200
    except httpx.HTTPError:
        return False


def should_use_scripted_llm() -> bool:
    forced = (os.getenv("AGENT_LLM") or "").strip().lower()
    if forced == "scripted":
        return True
    if forced in {"ollama", "azure"}:
        return False
    return "pytest" in sys.modules


def generate(prompt: str, model: str | None = None, stream: bool = False) -> dict:
    payload = {
        "model": model or ollama_model(),
        "prompt": prompt,
        "stream": stream,
    }
    response = httpx.post(
        f"{ollama_host()}/api/generate",
        json=payload,
        timeout=120.0,
    )
    response.raise_for_status()
    return response.json()
