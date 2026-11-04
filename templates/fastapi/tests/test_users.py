from fastapi.testclient import TestClient
from src.app import app, users_db
import pytest


@pytest.fixture(autouse=True)
def clear_users_db():
    users_db.clear()


def test_get_users_empty() -> None:
    client = TestClient(app)
    response = client.get("/users")
    assert response.status_code == 200
    assert response.json() == []


def test_create_user_success() -> None:
    client = TestClient(app)
    payload = {"username": "antigravity", "email": "test@example.com"}
    response = client.post("/users", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] == 1
    assert data["username"] == "antigravity"
    assert data["email"] == "test@example.com"


def test_create_user_empty_username_returns_400() -> None:
    client = TestClient(app)
    payload = {"username": "   ", "email": "test@example.com"}
    response = client.post("/users", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Username cannot be empty"


def test_get_user_by_id_success() -> None:
    client = TestClient(app)
    create_res = client.post(
        "/users", json={"username": "dev", "email": "dev@example.com"}
    )
    user_id = create_res.json()["id"]

    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    assert response.json()["username"] == "dev"


def test_get_user_by_id_not_found() -> None:
    client = TestClient(app)
    response = client.get("/users/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"


def test_update_user_success() -> None:
    client = TestClient(app)
    create_res = client.post(
        "/users", json={"username": "old_name", "email": "old@example.com"}
    )
    user_id = create_res.json()["id"]

    update_res = client.put(
        f"/users/{user_id}",
        json={"username": "new_name", "email": "new@example.com"},
    )
    assert update_res.status_code == 200
    data = update_res.json()
    assert data["username"] == "new_name"
    assert data["email"] == "new@example.com"


def test_delete_user_success() -> None:
    client = TestClient(app)
    create_res = client.post(
        "/users", json={"username": "temp_user", "email": "temp@example.com"}
    )
    user_id = create_res.json()["id"]

    del_res = client.delete(f"/users/{user_id}")
    assert del_res.status_code == 204

    get_res = client.get(f"/users/{user_id}")
    assert get_res.status_code == 404


def test_oidc_protected_without_token_returns_401() -> None:
    client = TestClient(app)
    response = client.get("/api/protected")
    assert response.status_code == 401
    assert "Missing or invalid authentication token" in response.json()["detail"]


def test_oidc_admin_without_admin_role_returns_403() -> None:
    client = TestClient(app)
    headers = {"Authorization": "Bearer user_token_regular"}
    response = client.get("/api/admin", headers=headers)
    assert response.status_code == 403
    assert "Insufficient permissions" in response.json()["detail"]


def test_oidc_admin_with_admin_role_returns_200() -> None:
    client = TestClient(app)
    headers = {"Authorization": "Bearer admin_token_valid"}
    response = client.get("/api/admin", headers=headers)
    assert response.status_code == 200
    assert response.json()["role"] == "Admin"
