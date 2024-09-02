# app/models/contribution.py

from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Dict

class ContributionRecord(BaseModel):
    username: str
    start_date: datetime
    end_date: datetime
    contributions: List[Dict]

    async def save(self, mongo_client):
        db = mongo_client.get_database("github_contributions")
        collection = db.get_collection("contributions")
        await collection.insert_one(self.dict())
