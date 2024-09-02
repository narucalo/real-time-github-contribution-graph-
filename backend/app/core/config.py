# app/core/config.py

from pydantic import BaseSettings

class Settings(BaseSettings):
    PORT: int = 8000
    MONGO_URI: str
    REDIS_URL: str
    GITHUB_TOKEN: str

    class Config:
        env_file = ".env"

settings = Settings()
