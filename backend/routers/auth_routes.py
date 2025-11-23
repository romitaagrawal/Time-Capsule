# routers/auth_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from models.user_model import create_user, get_user_by_email
from utils.auth_utils import hash_password, verify_password
from utils.token_utils import create_access_token

auth_router = APIRouter()

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@auth_router.post("/signup")
def signup(req: SignupRequest):
    if get_user_by_email(req.email):
        raise HTTPException(status_code=409, detail="User already exists")
    pw_hash = hash_password(req.password)
    user_id = create_user(req.name, req.email, pw_hash)
    token = create_access_token({"user_id": user_id})
    return {"user_id": user_id, "name": req.name, "token": token}

@auth_router.post("/login")
def login(req: LoginRequest):
    user = get_user_by_email(req.email)
    if not user or not verify_password(req.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"user_id": str(user["_id"])})
    return {"user_id": str(user["_id"]), "name": user["name"], "token": token}
