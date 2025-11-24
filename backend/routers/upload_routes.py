from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Header
from utils.token_utils import decode_access_token
from models.capsule_model import add_attachments_to_capsule
import os
from datetime import datetime
import uuid

upload_router = APIRouter()

UPLOAD_DIR = "./uploads"

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization")

    token = authorization.replace("Bearer ", "")
    try:
        payload = decode_access_token(token)
        return payload.get("user_id")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

@upload_router.post("/capsule/{capsule_id}/files")
async def upload_capsule_files(
    capsule_id: str,
    files: list[UploadFile] = File(...),
    user_id: str = Depends(get_current_user)
):
    save_dir = os.path.join(UPLOAD_DIR, "capsules", capsule_id)
    os.makedirs(save_dir, exist_ok=True)

    attachments = []

    for file in files:
        ext = file.filename.split(".")[-1]
        unique_name = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join(save_dir, unique_name)

        with open(file_path, "wb") as f:
            f.write(await file.read())

        attachments.append({
            "filename": file.filename,
            "stored_as": unique_name,
            "url": f"/uploads/capsules/{capsule_id}/{unique_name}",
            "uploaded_at": datetime.utcnow()
        })

    add_attachments_to_capsule(capsule_id, attachments)

    return {"success": True, "files": attachments}
