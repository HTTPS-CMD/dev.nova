import json
from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.core import Question, Topic


def list_questions(
    db: Session, difficulty: Optional[int] = None, topic: Optional[str] = None, year: Optional[int] = None
) -> List[Question]:
    query = db.query(Question)
    if difficulty is not None:
        query = query.filter(Question.difficulty == difficulty)
    if year is not None:
        query = query.filter(Question.year == year)
    if topic:
        query = query.join(Question.topic).filter(Topic.name == topic)
    return query.limit(25).all()


def create_question(
    db: Session,
    stem: str,
    choices: List[str],
    answer_index: int,
    difficulty: int,
    topic_id: Optional[int],
    year: Optional[int],
) -> Question:
    record = Question(
        stem=stem,
        choices=json.dumps(choices, ensure_ascii=False),
        answer_index=answer_index,
        difficulty=difficulty,
        topic_id=topic_id,
        year=year,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record
