from typing import List, Optional
from pydantic import BaseModel


class QuestionBase(BaseModel):
    stem: str
    choices: List[str]
    answer_index: int
    difficulty: int = 2
    year: Optional[int] = None
    topic: Optional[str] = None


class QuestionCreate(QuestionBase):
    topic_id: Optional[int] = None


class QuestionRead(QuestionBase):
    id: int
    topic_id: Optional[int] = None

    class Config:
        from_attributes = True
