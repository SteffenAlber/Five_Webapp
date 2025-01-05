import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel

SECRET_KEY = "your_secret_key"  # Replace with a secure key
ALGORITHM = "HS256"  # Algorithm used to sign the JWT
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Token expiration time

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")


class JWToken(BaseModel):
    token:str

