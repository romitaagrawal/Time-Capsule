# routers/journal_routes.py
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from models.journal_model import JOUR, create_entry, list_entries, get_entry_by_id, update_entry
from utils.token_utils import decode_access_token
from datetime import datetime
from typing import Optional
from bson import ObjectId
from models.capsule_model import CAPS, get_capsule_by_id
import os
import shutil


journal_router = APIRouter()

class JournalReq(BaseModel):
    title: str
    body: str
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

@journal_router.post("/")
def create_journal(req: JournalReq, user_id: str = Depends(get_current_user)):
    eid = create_entry(user_id, req.title, req.body, req.attachments or [])
    return {"entry_id": eid}

@journal_router.get("/")
def list_journal(user_id: str = Depends(get_current_user)):
    rows = list_entries(user_id)
    out = []
    for r in rows:
        r["_id"] = str(r["_id"])
        r["created_at"] = r["created_at"].isoformat()
        r["updated_at"] = r["updated_at"].isoformat()
        out.append(r)
    return {"entries": out}

@journal_router.get("/")
def list_journal(user_id: str = Depends(get_current_user)):
    rows = list_entries(user_id)
    out = []
    for r in rows:
        r["_id"] = str(r["_id"])
        r["created_at"] = r["created_at"].isoformat()
        r["updated_at"] = r["updated_at"].isoformat()

        r["attachments"] = r.get("attachments", [])

        out.append(r)

    return {"entries": out}

@journal_router.put("/{entry_id}")
def update_journal(entry_id: str, req: JournalReq, user_id: str = Depends(get_current_user)):
    e = get_entry_by_id(entry_id)
    if not e:
        raise HTTPException(status_code=404, detail="Entry not found")
    if e["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")
    update_entry(entry_id, {"title": req.title, "body": req.body, "attachments": req.attachments or []})
    return {"success": True}

@journal_router.delete("/{entry_id}")
def delete_journal_entry(entry_id: str, user_id: str = Depends(get_current_user)):
    entry = get_entry_by_id(entry_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")

    if entry["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    # delete DB
    JOUR.delete_one({"_id": ObjectId(entry_id)})

    # delete folder and all files
    folder = f"./uploads/journal/{entry_id}"
    if os.path.exists(folder):
        import shutil
        shutil.rmtree(folder)

    return {"success": True, "message": "Entry deleted"}
