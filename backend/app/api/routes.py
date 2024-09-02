# app/api/routes.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.github import fetch_github_contributions
from app.services.cache import get_from_cache, set_in_cache
from app.core.dependencies import get_mongo_client
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.get("/contributions")
async def get_contributions(
    username: str,
    start_date: str,
    end_date: str,
    mongo_client=Depends(get_mongo_client)
):
    # Validate dates
    try:
        start = datetime.fromisoformat(start_date)
        end = datetime.fromisoformat(end_date)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    cache_key = f"contributions:{username}:{start_date}:{end_date}"
    cached_data = await get_from_cache(cache_key)
    if cached_data:
        return cached_data

    contributions = await fetch_github_contributions(username, start, end)
    if not contributions:
        raise HTTPException(status_code=404, detail="No contributions found.")

    # Import Contribution here, within the function
    from app.models.contribution import Contribution

    # Save to MongoDB
    contribution_record = Contribution(
        username=username,
        start_date=start,
        end_date=end,
        contributions=contributions
    )
    await contribution_record.save(mongo_client)

    response = {
        "contributions": contributions,
        "metadata": {
            "username": username,
            "timeframe": f"{start_date} to {end_date}"
        }
    }

    await set_in_cache(cache_key, response)

    return response
