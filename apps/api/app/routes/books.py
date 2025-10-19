from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_session
from app.deps import get_current_user
from app.models.core import Book, User
from app.schemas.books import BookRead, BookUploadResponse

router = APIRouter(prefix="/books", tags=["books"])
settings = get_settings()


@router.post("/", response_model=BookUploadResponse, status_code=status.HTTP_201_CREATED)
async def upload_book(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_session),
):
    if file.content_type not in {"application/pdf", "application/x-pdf"}:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="تنها فایل‌های PDF پذیرفته می‌شوند.")

    storage_root = Path(settings.storage_dir)
    books_dir = storage_root / settings.books_subdir
    books_dir.mkdir(parents=True, exist_ok=True)

    file_identifier = uuid4().hex
    target_path = books_dir / f"{file_identifier}.pdf"

    content = await file.read()
    if not content:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="فایل ارسال‌شده خالی است.")

    target_path.write_bytes(content)

    title = Path(file.filename or "کتاب بدون نام").stem
    book = Book(
        user_id=current_user.id,
        title=title or "کتاب بدون نام",
        original_filename=file.filename or target_path.name,
        file_path=str(target_path),
    )
    db.add(book)
    db.commit()
    db.refresh(book)

    return BookUploadResponse.model_validate(book)


@router.get("/", response_model=list[BookRead])
def list_books(current_user: User = Depends(get_current_user), db: Session = Depends(get_session)):
    result = db.scalars(
        select(Book).where(Book.user_id == current_user.id).order_by(Book.created_at.desc())
    )
    return result.all()
