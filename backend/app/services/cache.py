import redis
import json
import os

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")

# Initialize Redis connection
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

def get_from_cache(key):
    data = redis_client.get(key)
    return json.loads(data) if data else None

def set_in_cache(key, value, expire=3600):
    redis_client.set(key, json.dumps(value), ex=expire)
