# app/services/github.py

import httpx
import os
from app.services.processing import process_contributions

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

async def fetch_github_contributions(username: str, start_date, end_date):
    url = f"https://api.github.com/users/{username}/events"
    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code != 200:
            return None
        events = response.json()
        filtered_events = [
            event for event in events
            if start_date <= datetime.fromisoformat(event["created_at"][:-1]) <= end_date
        ]
        return process_contributions(filtered_events)
