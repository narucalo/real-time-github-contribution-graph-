# app/services/processing.py

from collections import defaultdict
from datetime import datetime

def process_contributions(events):
    contributions = defaultdict(lambda: {
        "commits": 0,
        "pull_requests": 0,
        "issues": 0,
        "code_reviews": 0
    })

    for event in events:
        date = event["created_at"][:10]
        if event["type"] == "PushEvent":
            contributions[date]["commits"] += len(event["payload"]["commits"])
        elif event["type"] == "PullRequestEvent":
            contributions[date]["pull_requests"] += 1
        elif event["type"] == "IssuesEvent":
            contributions[date]["issues"] += 1
        elif event["type"] == "PullRequestReviewEvent":
            contributions[date]["code_reviews"] += 1

    # Convert defaultdict to list
    return [
        {"date": date, **data}
        for date, data in sorted(contributions.items())
    ]
