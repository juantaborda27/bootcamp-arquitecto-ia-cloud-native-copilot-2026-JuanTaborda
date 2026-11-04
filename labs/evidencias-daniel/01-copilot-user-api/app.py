from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from fastapi.responses import JSONResponse
import uuid

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: EmailStr

_users = {}

@app.post("/users")
def create_user(payload: UserCreate):
    user_id = str(uuid.uuid4())
    user = {"id": user_id, "name": payload.name, "email": str(payload.email)}
    _users[user_id] = user
    return JSONResponse(status_code=201, content=user)
