import os

from rq import Connection, Queue, Worker
import redis

from app.config import get_settings

settings = get_settings()

listen = ["default"]


if __name__ == "__main__":
    conn = redis.from_url(settings.redis_url)
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()
