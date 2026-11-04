from typing import Optional
from fastapi import FastAPI, HTTPException, Query, Security, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

app = FastAPI(title="EnrollmentHub FastAPI Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer(auto_error=False)


class UserCreate(BaseModel):
    username: str
    email: str
    status: str = "ACTIVE"


class UserUpdate(BaseModel):
    username: str
    email: str
    status: str = "ACTIVE"


class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    status: str = "ACTIVE"


users_db: list[dict[str, str | int]] = []


def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = credentials.credentials
    # Mock JWT payload parsing for OIDC demonstration
    if token == "invalid_token":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    role = "Admin" if "admin" in token.lower() else "User"
    return {"sub": "user_123", "username": "test_user", "role": role, "token": token}


def require_admin_role(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "Admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Insufficient permissions. Admin role required.",
        )
    return user


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/users/count")
def get_users_count() -> dict[str, int]:
    return {"count": len(users_db)}


@app.get("/users", response_model=list[UserResponse])
def get_users(active: bool | None = Query(default=None)) -> list[dict[str, str | int]]:
    if active is True:
        return [
            user
            for user in users_db
            if str(user.get("status", "ACTIVE")).upper() == "ACTIVE"
        ]
    return users_db


@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate) -> dict[str, str | int]:
    if not user.username.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username cannot be empty",
        )
    new_user = {
        "id": len(users_db) + 1,
        "username": user.username,
        "email": user.email,
        "status": user.status or "ACTIVE",
    }
    users_db.append(new_user)
    return new_user


@app.get("/users/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: int) -> dict[str, str | int]:
    for user in users_db:
        if user["id"] == user_id:
            return user
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
    )


@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate) -> dict[str, str | int]:
    for idx, user in enumerate(users_db):
        if user["id"] == user_id:
            if not user_update.username.strip():
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username cannot be empty",
                )
            users_db[idx]["username"] = user_update.username
            users_db[idx]["email"] = user_update.email
            users_db[idx]["status"] = user_update.status or users_db[idx].get("status", "ACTIVE")
            return users_db[idx]
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
    )


@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int):
    for idx, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db.pop(idx)
            return
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
    )


class TokenRequest(BaseModel):
    username: str = "testuser"
    role: str = "User"


# Endpoints OIDC / Security
@app.post("/api/auth/token")
def generate_token(req: TokenRequest):
    role = req.role if req.role in ["Admin", "User"] else "User"
    mock_token = f"mock_jwt_token_{req.username}_{role.lower()}"
    return {"token": mock_token, "role": role}


@app.get("/api/protected")
def protected_route(user: dict = Depends(get_current_user)):
    return {"message": "Acceso autorizado con token OIDC/JWT", "user": user}


@app.get("/api/admin")
def admin_route(user: dict = Depends(require_admin_role)):
    return {"message": "Acceso concedido a zona Admin", "role": user.get("role")}


# Endpoint de Métricas de Observabilidad para Prometheus
@app.get("/metrics")
def metrics():
    from fastapi.responses import PlainTextResponse

    metrics_data = (
        "# HELP http_requests_total Total number of HTTP requests\n"
        "# TYPE http_requests_total counter\n"
        'http_requests_total{method="GET",handler="/users",status="200"} 1420\n'
        'http_requests_total{method="POST",handler="/users",status="201"} 310\n'
        'http_requests_total{method="GET",handler="/api/protected",status="401"} 12\n'
        "# HELP http_request_duration_seconds HTTP request duration in seconds\n"
        "# TYPE http_request_duration_seconds histogram\n"
        'http_request_duration_seconds_sum{handler="/users"} 0.042\n'
        'http_request_duration_seconds_count{handler="/users"} 1420\n'
    )
    return PlainTextResponse(content=metrics_data)


from src.agent.router import router as agent_router

app.include_router(agent_router)

