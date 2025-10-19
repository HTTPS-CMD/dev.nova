from typing import List
from pydantic import BaseModel


class TopicBreakdown(BaseModel):
    topic: str
    accuracy: float
    attempts: int


class OverviewMetrics(BaseModel):
    accuracy: float
    attempts: int
    per_topic: List[TopicBreakdown]
