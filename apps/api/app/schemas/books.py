from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class BookRead(BaseModel):
    id: int
    title: str
    original_filename: str
    created_at: datetime

    class Config:
        from_attributes = True


class BookUploadResponse(BookRead):
    file_path: Optional[str] = None

    class Config:
        from_attributes = True
