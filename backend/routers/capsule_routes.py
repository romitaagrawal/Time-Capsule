# routers/capsule_routes.py
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from models.capsule_model import create_capsule, list_user_capsules, get_capsule_by_id, set_unlocked
from utils.token_utils import decode_access_token
from datetime import datetime
from typing import Optional

capsule_router = APIRouter()

class CreateCapsuleRequest(BaseModel):
    title: str
    creator_name: str
    open_date: datetime
    attachments: Optional[list] = []

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    token = authorization.split("Bearer ")[-1]
    try:
        payload = decode_access_token(token)
        return payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

@capsule_router.post("/")
def create_capsule_route(req: CreateCapsuleRequest, user_id: str = Depends(get_current_user)):
    # create a capsule record, attachments contain metadata (filename, url, mimetype, etc)
    cid = create_capsule(user_id, req.title, req.creator_name, req.open_date, req.attachments or [])
    return {"capsule_id": cid}

@capsule_router.get("/")
def list_capsules(user_id: str = Depends(get_current_user)):
    rows = list_user_capsules(user_id)
    # convert ObjectIds and datetimes to strings
    out = []
    for r in rows:
        r["_id"] = str(r["_id"])
        r["open_date"] = r["open_date"].isoformat()
        r["created_at"] = r["created_at"].isoformat()
        out.append(r)
    return {"capsules": out}

@capsule_router.get("/{capsule_id}")
def get_capsule(capsule_id: str, user_id: str = Depends(get_current_user)):
    c = get_capsule_by_id(capsule_id)
    if not c:
        raise HTTPException(status_code=404, detail="Capsule not found")
    if c["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    now = datetime.utcnow()
    if now < c["open_date"]:
        # locked
        return {"locked": True, "open_date": c["open_date"].isoformat(), "title": c["title"]}
    # unlocked -> mark unlocked flag and return full
    if not c.get("unlocked"):
        set_unlocked(capsule_id)
    # convert dates
    c["_id"] = str(c["_id"])
    c["open_date"] = c["open_date"].isoformat()
    c["created_at"] = c["created_at"].isoformat()
    return {"locked": False, "capsule": c}
    