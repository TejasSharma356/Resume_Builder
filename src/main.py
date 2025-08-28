from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from typing import List
from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import datetime, timedelta

# Setup
app = FastAPI()
origins = ["http://localhost:3000"]  # Add your frontend URL here
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Auth utils
SECRET_KEY = "your_secret_here"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
bcrypt_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

# "Fake DB" dicts for demo (replace with real db)
users_db = {}
resumes_db = {}

# Pydantic models
class User(BaseModel):
    id: str
    name: str
    email: EmailStr
    password_hash: str

class Resume(BaseModel):
    id: str
    user_id: str
    basics: dict = {}
    work: list = []
    education: list = []
    skills: list = []
    projects: list = []
    summary: str = ""

# Auth
def authenticate_user(email, password):
    user = next((u for u in users_db.values() if u.email == email), None)
    if not user or not bcrypt_ctx.verify(password, user.password_hash):
        return None
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401)
        return users_db[user_id]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# API routes
@app.post("/api/auth/register")
def register(name: str, email: EmailStr, password: str):
    if any(u.email == email for u in users_db.values()):
        raise HTTPException(status_code=409, detail="Email already registered")
    uid = str(len(users_db) + 1)
    users_db[uid] = User(id=uid, name=name, email=email, password_hash=bcrypt_ctx.hash(password))
    return {"id": uid, "name": name, "email": email}

@app.post("/api/auth/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect credentials")
    token = create_access_token({"sub": user.id})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/health")
def health(): return {"ok": True}

@app.get("/api/resumes", response_model=List[Resume])
def get_resumes(user=Depends(get_current_user)):
    return [r for r in resumes_db.values() if r.user_id == user.id]

@app.post("/api/resumes", response_model=Resume)
def create_resume(resume: Resume, user=Depends(get_current_user)):
    rid = str(len(resumes_db) + 1)
    resume.id, resume.user_id = rid, user.id
    resumes_db[rid] = resume
    return resume

@app.get("/api/resumes/{resume_id}", response_model=Resume)
def get_resume(resume_id: str, user=Depends(get_current_user)):
    resume = resumes_db.get(resume_id)
    if not resume or resume.user_id != user.id:
        raise HTTPException(status_code=404)
    return resume

@app.put("/api/resumes/{resume_id}", response_model=Resume)
def update_resume(resume_id: str, data: Resume, user=Depends(get_current_user)):
    resume = resumes_db.get(resume_id)
    if not resume or resume.user_id != user.id:
        raise HTTPException(status_code=404)
    data.id = resume_id
    data.user_id = user.id
    resumes_db[resume_id] = data
    return data

@app.delete("/api/resumes/{resume_id}")
def delete_resume(resume_id: str, user=Depends(get_current_user)):
    resume = resumes_db.get(resume_id)
    if not resume or resume.user_id != user.id:
        raise HTTPException(status_code=404)
    del resumes_db[resume_id]
    return {"ok": True}
