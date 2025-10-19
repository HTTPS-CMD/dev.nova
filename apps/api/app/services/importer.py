import csv
import json
from pathlib import Path
from typing import Dict

from sqlalchemy.orm import Session

from app.models.core import Question, Topic


def import_questions(db: Session, csv_path: str) -> int:
    path = Path(csv_path)
    if not path.exists():
        raise FileNotFoundError(csv_path)

    topic_cache: Dict[str, Topic] = {}
    created = 0

    with path.open("r", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            topic_name = row.get("topic") or "عمومی"
            topic = topic_cache.get(topic_name)
            if topic is None:
                topic = Topic(name=topic_name)
                db.add(topic)
                db.commit()
                db.refresh(topic)
                topic_cache[topic_name] = topic

            question = Question(
                stem=row["stem"],
                choices=json.dumps(
                    [row["choice1"], row["choice2"], row["choice3"], row["choice4"]],
                    ensure_ascii=False,
                ),
                answer_index=int(row["answer_index"]),
                difficulty=int(row.get("difficulty") or 2),
                year=int(row["year"]),
                topic_id=topic.id,
            )
            db.add(question)
            created += 1

    db.commit()
    return created
