from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.deps import get_db
from app.schemas.analytics import OverviewMetrics
from app.services.analytics import overview_metrics

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/overview", response_model=OverviewMetrics)
def overview(user_id: int, db: Session = Depends(get_db)):
    data = overview_metrics(db, user_id)
    return OverviewMetrics(
        accuracy=data["accuracy"],
        attempts=data["attempts"],
        per_topic=data["per_topic"],
    )
