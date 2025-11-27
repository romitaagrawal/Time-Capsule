from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from models.capsule_model import create_capsule, list_user_capsules, get_capsule_by_id, set_unlocked
from utils.token_utils import decode_access_token
from datetime import datetime, timedelta
from typing import Optional
from bson import ObjectId
from models.capsule_model import CAPS, get_capsule_by_id
import os
import shutil


capsule_router = APIRouter()

IST_OFFSET = timedelta(hours=5, minutes=30)

class CreateCapsuleRequest(BaseModel):
    title: str
    creator_name: str
    open_date: str
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
    # FIX ISO Z SUFFIX
    # req.open_date is a datetime object OR iso string with "Z" at the end
    if isinstance(req.open_date, str):
        clean_str = req.open_date.replace("Z", "").replace("z", "")
        open_dt = datetime.fromisoformat(clean_str)
    else:
        open_dt = req.open_date

    # save capsule with cleaned datetime
    cid = create_capsule(
        user_id,
        req.title,
        req.creator_name,
        open_dt,
        req.attachments or []
    )
    return {"capsule_id": cid}

@capsule_router.get("/")
def list_capsules(user_id: str = Depends(get_current_user)):
    rows = list_user_capsules(user_id)
    out = []
    for r in rows:
        # convert UTC → IST for display
        r["_id"] = str(r["_id"])
        r["open_date"] = (r["open_date"] + IST_OFFSET).isoformat()
        r["created_at"] = (r["created_at"] + IST_OFFSET).isoformat()
        out.append(r)
    return {"capsules": out}

@capsule_router.get("/{capsule_id}")
def get_capsule(capsule_id: str, user_id: str = Depends(get_current_user)):
    c = get_capsule_by_id(capsule_id)
    if not c:
        raise HTTPException(status_code=404, detail="Capsule not found")
    if c["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    now_utc = datetime.utcnow()

    if now_utc < c["open_date"]:
        # locked
        return {
            "locked": True,
            "open_date": (c["open_date"] + IST_OFFSET).isoformat(),
            "title": c["title"]
        }

    # unlock & return capsule
    if not c.get("unlocked"):
        set_unlocked(capsule_id)

    c["_id"] = str(c["_id"])
    c["open_date"] = (c["open_date"] + IST_OFFSET).isoformat()
    c["created_at"] = (c["created_at"] + IST_OFFSET).isoformat()

    return {"locked": False, "capsule": c}

@capsule_router.delete("/{capsule_id}")
def delete_capsule(capsule_id: str, user_id: str = Depends(get_current_user)):
    capsule = get_capsule_by_id(capsule_id)
    if not capsule:
        raise HTTPException(status_code=404, detail="Capsule not found")

    if capsule["owner_id"] != user_id:
        raise HTTPException(status_code=403, detail="Forbidden")

    # Delete DB record
    CAPS.delete_one({"_id": ObjectId(capsule_id)})

    # Delete files from storage
    folder = f"./uploads/capsules/{capsule_id}"
    if os.path.exists(folder):
        import shutil
        shutil.rmtree(folder)

    return {"success": True, "message": "Capsule deleted"}
