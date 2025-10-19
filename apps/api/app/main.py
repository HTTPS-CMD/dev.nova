from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.models.core import Base
from app.database import engine
from app.routes import analytics, auth, books, exams, questions, summaries

settings = get_settings()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Legal Learning API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(summaries.router)
app.include_router(questions.router)
app.include_router(exams.router)
app.include_router(analytics.router)
app.include_router(books.router)


@app.get("/health")
def healthcheck():
    return {"status": "ok"}
