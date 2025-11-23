# routers/upload_routes.py
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from typing import List
from utils.file_utils import save_upload_file, build_file_metadata
from utils.token_utils import decode_access_token
from fastapi import Header
import uuid

upload_router = APIRouter()

def get_current_user_from_header(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    token = authorization.split("Bearer ")[-1]
    try:
        payload = decode_access_token(token)
        return payload.get("user_id")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

@upload_router.post("/capsule/{capsule_id}/files")
async def upload_capsule_files(capsule_id: str, files: List[UploadFile] = File(...), user_id: str = Depends(get_current_user_from_header)):
    saved = []
    for f in files:
        filename = f.filename
        file_meta = build_file_metadata(user_id, "capsules", capsule_id, filename)
        save_upload_file(f, file_meta["fs_path"])
        # drop fs_path before returning
        file_meta.pop("fs_path", None)
        saved.append(file_meta)
    return {"saved": saved}

@upload_router.post("/journal/{entry_id}/files")
async def upload_journal_files(entry_id: str, files: List[UploadFile] = File(...), user_id: str = Depends(get_current_user_from_header)):
    saved = []
    for f in files:
        filename = f.filename
        file_meta = build_file_metadata(user_id, "journals", entry_id, filename)
        save_upload_file(f, file_meta["fs_path"])
        file_meta.pop("fs_path", None)
        saved.append(file_meta)
    return {"saved": saved}
