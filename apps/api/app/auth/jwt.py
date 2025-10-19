from datetime import datetime, timedelta
from typing import Dict, Optional

from jose import JWTError, jwt

from app.config import get_settings

settings = get_settings()
ALGORITHM = "HS256"
DEFAULT_EXPIRE_MINUTES = 60 * 24


def create_token(
    subject: str,
    expires_delta: Optional[timedelta] = None,
    extra_claims: Optional[Dict[str, str]] = None,
) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=DEFAULT_EXPIRE_MINUTES))
    payload = {"sub": subject, "exp": expire}
    if extra_claims:
        payload.update(extra_claims)
    return jwt.encode(payload, settings.jwt_secret, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
