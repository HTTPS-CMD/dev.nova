from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_session
from app.auth.jwt import decode_token


def get_db(db: Session = Depends(get_session)) -> Session:
    return db


def get_current_user(token: str, db: Session = Depends(get_db)):
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    # Placeholder: fetch user by ID when auth is implemented
    return payload
