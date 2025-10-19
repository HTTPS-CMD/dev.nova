from pydantic import BaseModel


class SummaryCreate(BaseModel):
    text: str
    max_sentences: int = 7


class SummaryRead(BaseModel):
    markdown: str
