from functools import lru_cache
from pydantic_settings import BaseSettings
class Settings(BaseSettings):
    api_port: int = 8000
    jwt_secret: str = "change_me"

    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "ai_legal"
    postgres_user: str = "ai_legal"
    postgres_password: str = "ai_legal_pwd"

    redis_url: str = "redis://localhost:6379/0"

    s3_endpoint: str = "http://localhost:9000"
    s3_access_key: str = "minio"
    s3_secret_key: str = "minio123"
    s3_bucket: str = "ai-legal"

    @property
    def database_url(self) -> str:
        return (
            f"postgresql+psycopg2://{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
