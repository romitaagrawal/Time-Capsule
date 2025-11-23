# models/journal_model.py
from database import db
from bson import ObjectId
from datetime import datetime

JOUR = db.journal_entries

def create_entry(owner_id: str, title: str, body: str, attachments: list):
    doc = {
        "owner_id": owner_id,
        "title": title,
        "body": body,
        "attachments": attachments,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    res = JOUR.insert_one(doc)
    return str(res.inserted_id)

def list_entries(owner_id: str):
    return list(JOUR.find({"owner_id": owner_id}).sort("created_at", -1))

def get_entry_by_id(eid: str):
    return JOUR.find_one({"_id": ObjectId(eid)})

def update_entry(eid: str, data: dict):
    data["updated_at"] = datetime.utcnow()
    return JOUR.update_one({"_id": ObjectId(eid)}, {"$set": data})
