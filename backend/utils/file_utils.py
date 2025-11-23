# utils/file_utils.py
import os
import shutil
from datetime import datetime
from dotenv import load_dotenv
load_dotenv()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")

def ensure_dir(path: str):
    os.makedirs(path, exist_ok=True)

def save_upload_file(file, dest_path: str):
    """
    file: starlette UploadFile
    dest_path: full filesystem path where file will be saved (including filename)
    """
    ensure_dir(os.path.dirname(dest_path))
    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

def build_file_metadata(user_id: str, container: str, item_id: str, filename: str):
    # container: 'capsules' or 'journals'
    rel_path = f"/uploads/{container}/{user_id}/{item_id}/{filename}"
    fs_path = os.path.join(UPLOAD_DIR, container, user_id, item_id, filename)
    return {"filename": filename, "url": rel_path, "fs_path": fs_path, "uploaded_at": datetime.utcnow()}
