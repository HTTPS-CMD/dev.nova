from fastapi import APIRouter

from app.schemas.summaries import SummaryCreate, SummaryRead
from app.services.summarizer import extractive_summary

router = APIRouter(prefix="/summaries", tags=["summaries"])


@router.post("/extract", response_model=SummaryRead)
async def summarize_text(payload: SummaryCreate):
    sentences = extractive_summary(payload.text, payload.max_sentences)
    markdown = "\n\n".join(f"- {sentence}" for sentence in sentences)
    return SummaryRead(markdown=markdown)
