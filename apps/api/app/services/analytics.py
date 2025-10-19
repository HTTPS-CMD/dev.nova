from sqlalchemy import Integer, cast, func
from sqlalchemy.orm import Session

from app.models.core import Attempt, ExamSession, Question, Topic


def overview_metrics(db: Session, user_id: int):
    total_attempts = (
        db.query(func.count(Attempt.id))
        .join(ExamSession, ExamSession.id == Attempt.session_id)
        .filter(ExamSession.user_id == user_id)
        .scalar()
        or 0
    )

    correct_attempts = (
        db.query(func.count(Attempt.id))
        .join(ExamSession, ExamSession.id == Attempt.session_id)
        .filter(ExamSession.user_id == user_id, Attempt.correct.is_(True))
        .scalar()
        or 0
    )

    accuracy = (correct_attempts / total_attempts) * 100 if total_attempts else 0.0

    per_topic = []
    topic_rows = (
        db.query(Topic.name, func.count(Attempt.id), func.avg(cast(Attempt.correct, Integer)))
        .join(Question, Question.topic_id == Topic.id)
        .join(Attempt, Attempt.question_id == Question.id)
        .join(ExamSession, ExamSession.id == Attempt.session_id)
        .filter(ExamSession.user_id == user_id)
        .group_by(Topic.name)
        .all()
    )

    for name, count, avg_correct in topic_rows:
        per_topic.append(
            {
                "topic": name,
                "attempts": count,
                "accuracy": float(avg_correct * 100) if avg_correct is not None else 0.0,
            }
        )

    return {
        "accuracy": accuracy,
        "attempts": total_attempts,
        "per_topic": per_topic,
    }
