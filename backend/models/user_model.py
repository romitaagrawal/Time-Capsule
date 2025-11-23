# models/user_model.py
from database import db
from bson import ObjectId

USERS = db.users

def create_user(name: str, email: str, password_hash: str):
    doc = {"name": name, "email": email.lower(), "password": password_hash, "created_at": None}
    res = USERS.insert_one(doc)
    return str(res.inserted_id)

def get_user_by_email(email: str):
    return USERS.find_one({"email": email.lower()})

def get_user_by_id(uid: str):
    return USERS.find_one({"_id": ObjectId(uid)})
