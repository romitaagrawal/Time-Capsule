# main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth_routes, capsule_routes, journal_routes, upload_routes
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles


load_dotenv()

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")

app = FastAPI(title="Time Capsule API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# include routers
app.include_router(auth_routes.auth_router, prefix="/auth")
app.include_router(capsule_routes.capsule_router, prefix="/capsules")
app.include_router(journal_routes.journal_router, prefix="/journal")
app.include_router(upload_routes.upload_router, prefix="/upload")

# serve uploaded files at /uploads
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

@app.get("/")
def root():
    return {"message": "Time Capsule FastAPI backend running"}
