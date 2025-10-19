import json
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.core import Attempt, ExamSession, Question

DIFF_MIN, DIFF_MAX = 1, 5


def serialize_question(question: Optional[Question]) -> Optional[dict]:
    if question is None:
        return None
    return {
        "id": question.id,
        "stem": question.stem,
        "choices": json.loads(question.choices),
        "answer_index": question.answer_index,
        "difficulty": question.difficulty,
        "topic_id": question.topic_id,
        "topic": question.topic.name if question.topic else None,
        "year": question.year,
    }


def next_question(db: Session, session: ExamSession) -> Optional[Question]:
    return (
        db.query(Question)
        .filter(Question.difficulty == session.current_difficulty)
        .order_by(func.random())
        .first()
    )


def record_answer(
    db: Session, session: ExamSession, question: Question, chosen_index: int
) -> bool:
    correct = chosen_index == question.answer_index
    attempt = Attempt(
        session_id=session.id,
        question_id=question.id,
        chosen_index=chosen_index,
        correct=correct,
    )
    db.add(attempt)

    if correct:
        session.correct_streak += 1
        session.wrong_streak = 0
        if session.correct_streak >= 3:
            session.current_difficulty = min(DIFF_MAX, session.current_difficulty + 1)
            session.correct_streak = 0
    else:
        session.wrong_streak += 1
        session.correct_streak = 0
        if session.wrong_streak >= 3:
            session.current_difficulty = max(DIFF_MIN, session.current_difficulty - 1)
            session.wrong_streak = 0

    db.commit()
    db.refresh(session)
    return correct
