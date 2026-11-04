import re

MAX_PROMPT_LENGTH = 2000
BLOCKED_FRAGMENTS = (
    "ignore previous",
    "ignore all previous",
    "disregard previous",
    "system prompt",
    "developer mode",
)


class PromptRejectedError(ValueError):
    pass


def sanitize_prompt(prompt: str | None) -> str:
    if prompt is None or not str(prompt).strip():
        raise PromptRejectedError("Prompt is required")

    normalized = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", str(prompt).strip())
    if len(normalized) > MAX_PROMPT_LENGTH:
        raise PromptRejectedError("Prompt exceeds maximum length")

    lowered = normalized.lower()
    for fragment in BLOCKED_FRAGMENTS:
        if fragment in lowered:
            raise PromptRejectedError("Prompt rejected by safety policy")

    return normalized
