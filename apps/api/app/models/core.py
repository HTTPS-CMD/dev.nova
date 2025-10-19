from datetime import datetime
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)


class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True)
    stem = Column(Text, nullable=False)
    choices = Column(Text, nullable=False)
    answer_index = Column(Integer, nullable=False)
    difficulty = Column(Integer, default=2)
    year = Column(Integer)
    topic_id = Column(Integer, ForeignKey("topics.id"))
    topic = relationship("Topic")


class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    source_uri = Column(String)
    markdown = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    user = relationship("User")


class ExamSession(Base):
    __tablename__ = "exam_sessions"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    adaptive = Column(Boolean, default=False)
    current_difficulty = Column(Integer, default=2)
    correct_streak = Column(Integer, default=0)
    wrong_streak = Column(Integer, default=0)
    started_at = Column(DateTime, default=datetime.utcnow)
    finished_at = Column(DateTime)


class Attempt(Base):
    __tablename__ = "attempts"

    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("exam_sessions.id"))
    question_id = Column(Integer, ForeignKey("questions.id"))
    chosen_index = Column(Integer)
    correct = Column(Boolean)
    created_at = Column(DateTime, default=datetime.utcnow)
