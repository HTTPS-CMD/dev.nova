from fastapi import APIRouter

from app.auth.jwt import create_token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token")
def issue_token(email: str):
    """Temporary credentials endpoint.

    For the MVP scaffold this returns a signed JWT without validating credentials.
    Replace with a secure authentication flow before production.
    """

    token = create_token(email)
    return {"access_token": token, "token_type": "bearer"}
