from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_create_user_returns_201_and_user_data():
    resp = client.post("/users", json={"name": "Ana", "email": "ana@example.com"})
    assert resp.status_code == 201
    data = resp.json()
    assert "id" in data
    assert data["name"] == "Ana"
    assert data["email"] == "ana@example.com"
