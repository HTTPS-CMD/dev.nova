from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.deps import get_db
from app.models.core import ExamSession, Question
from app.schemas.exams import (
    ExamAnswerRequest,
    ExamAnswerResponse,
    ExamStartRequest,
    ExamStartResponse,
)
from app.services.adaptive import next_question, record_answer, serialize_question

router = APIRouter(prefix="/exams", tags=["exams"])


@router.post("/start", response_model=ExamStartResponse)
def start_session(payload: ExamStartRequest, db: Session = Depends(get_db)):
    session = ExamSession(user_id=payload.user_id, adaptive=payload.adaptive)
    db.add(session)
    db.commit()
    db.refresh(session)

    question = next_question(db, session)
    return ExamStartResponse(session_id=session.id, question=serialize_question(question))


@router.post("/answer", response_model=ExamAnswerResponse)
def answer(payload: ExamAnswerRequest, db: Session = Depends(get_db)):
    session = db.get(ExamSession, payload.session_id)
    question = db.get(Question, payload.question_id)

    if session is None or question is None:
        raise HTTPException(status_code=404, detail="Session or question not found")

    correct = record_answer(db, session, question, payload.choice)
    next_q = next_question(db, session)

    return ExamAnswerResponse(
        correct=correct,
        next=serialize_question(next_q),
        difficulty=session.current_difficulty,
    )
