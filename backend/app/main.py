# app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as api_router
from app.websocket.connection import websocket_router

app = FastAPI(
    title="Real-Time GitHub Contribution Graph",
    description="An API to fetch and display real-time GitHub contributions.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API and WebSocket routes
app.include_router(api_router, prefix="/api")
app.include_router(websocket_router)
