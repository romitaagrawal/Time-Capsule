# models/capsule_model.py
from bson import ObjectId
from datetime import datetime
from db import get_db

db = get_db()
CAPS = db.capsules

def create_capsule(owner_id: str, title: str, creator_name: str, open_date: datetime, attachments: list):
    doc = {
        "owner_id": owner_id,
        "title": title,
        "creator_name": creator_name,
        "open_date": open_date,     # stored in UTC
        "attachments": attachments, # initially empty list
        "created_at": datetime.utcnow(),
        "unlocked": False,
        "unlocked_at": None
    }
    res = CAPS.insert_one(doc)
    return str(res.inserted_id)

def list_user_capsules(owner_id: str):
    return list(CAPS.find({"owner_id": owner_id}).sort("created_at", -1))

def get_capsule_by_id(cid: str):
    return CAPS.find_one({"_id": ObjectId(cid)})

def set_unlocked(cid: str):
    return CAPS.update_one(
        {"_id": ObjectId(cid)},
        {"$set": {"unlocked": True, "unlocked_at": datetime.utcnow()}}
    )

def add_attachments_to_capsule(capsule_id: str, attachments: list):
    CAPS.update_one(
        {"_id": ObjectId(capsule_id)},
        {"$push": {"attachments": {"$each": attachments}}}
    )
