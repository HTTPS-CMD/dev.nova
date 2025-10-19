from typing import Optional
from pydantic import BaseModel

from .questions import QuestionRead


class ExamStartRequest(BaseModel):
    user_id: int
    adaptive: bool = True


class ExamStartResponse(BaseModel):
    session_id: int
    question: Optional[QuestionRead]


class ExamAnswerRequest(BaseModel):
    session_id: int
    question_id: int
    choice: int


class ExamAnswerResponse(BaseModel):
    correct: bool
    next: Optional[QuestionRead]
    difficulty: int
