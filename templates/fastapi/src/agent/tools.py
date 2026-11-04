"""Tools de mínimo privilegio sobre el store de usuarios de la API FastAPI."""

from __future__ import annotations

import json
from typing import Any

from langchain_core.tools import tool


def _users() -> list[dict[str, Any]]:
    from src.app import users_db

    return list(users_db)


@tool
def get_active_users() -> str:
    """Returns a JSON list of active users from the EnrollmentHub FastAPI store."""
    active = [
        user
        for user in _users()
        if str(user.get("status", "ACTIVE")).upper() == "ACTIVE"
    ]
    return json.dumps(active, ensure_ascii=False)


@tool
def get_user_count() -> str:
    """Returns the total count of registered users in the EnrollmentHub store."""
    return json.dumps({"count": len(_users())})


AGENT_TOOLS = [get_active_users, get_user_count]
