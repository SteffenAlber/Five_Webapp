import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
import secrets

SECRET_KEY = secrets.token_hex(32)  #für distributed deployment statischer key?
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 3

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload


class JWToken(BaseModel):
    token:str

