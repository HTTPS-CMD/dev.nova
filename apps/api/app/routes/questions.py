import json
from typing import List, Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.deps import get_db
from app.schemas.questions import QuestionCreate, QuestionRead
from app.services.questions import create_question, list_questions

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("/sample", response_model=List[QuestionRead])
def sample_questions(
    difficulty: Optional[int] = None,
    topic: Optional[str] = None,
    year: Optional[int] = None,
    db: Session = Depends(get_db),
):
    return [
        QuestionRead(
            id=record.id,
            stem=record.stem,
            choices=record.choices and json.loads(record.choices) or [],
            answer_index=record.answer_index,
            difficulty=record.difficulty,
            year=record.year,
            topic=record.topic.name if record.topic else None,
            topic_id=record.topic_id,
        )
        for record in list_questions(db, difficulty, topic, year)
    ]


@router.post("/", response_model=QuestionRead)
def create(payload: QuestionCreate, db: Session = Depends(get_db)):
    record = create_question(
        db,
        stem=payload.stem,
        choices=payload.choices,
        answer_index=payload.answer_index,
        difficulty=payload.difficulty,
        topic_id=payload.topic_id,
        year=payload.year,
    )
    return QuestionRead(
        id=record.id,
        stem=record.stem,
        choices=json.loads(record.choices),
        answer_index=record.answer_index,
        difficulty=record.difficulty,
        year=record.year,
        topic_id=record.topic_id,
    )
