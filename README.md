# Real-Time GitHub Contribution Graph

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [WebSocket Integration](#websocket-integration)
- [Contributing](#contributing)
- [License](#license)

## Overview
The Real-Time GitHub Contribution Graph is a web application that visualizes GitHub contributions in real-time. It tracks contributions such as commits, pull requests, issues, and code reviews for a specified GitHub repository or user, and displays this data in a visually appealing and interactive graph.

## Features
- **Real-Time Data**: Visualize contributions as they happen, using WebSocket for real-time updates.
- **RESTful API**: Fetch GitHub contribution data through a well-defined API.
- **Interactive Graph**: Utilize D3.js and Chart.js for dynamic and interactive data visualization.
- **Containerized Deployment**: Deploy the application using Docker for consistent and portable execution across environments.

## Architecture
The project is divided into two main components:
1. **Backend**: Built with FastAPI (Python), it handles the API requests, manages WebSocket connections, and interacts with the MongoDB and Redis databases.
2. **Frontend**: A React application that fetches data from the backend and displays it on a real-time interactive graph.

## Tech Stack
- **Backend**:
  - FastAPI (Python)
  - MongoDB (Database)
  - Redis (Caching)
  - Docker (Containerization)
  - Uvicorn (ASGI server)
- **Frontend**:
  - React
  - Vite
  - D3.js and Chart.js (Data Visualization)
  - WebSocket

## Setup

### Prerequisites
- **Docker**: Ensure Docker is installed on your system.
- **Git**: Git must be installed to clone the repository.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/real-time-github-contribution-graph.git
   cd real-time-github-contribution-graph


Create a .env file in the backend directory with the following content:
MONGO_URI=mongodb://mongo:27017/github-contributions
REDIS_URL=redis://redis:6379
GITHUB_API_TOKEN=your_github_api_token_here


### Additional Notes
- Replace the `yourusername` placeholder in the Git clone command with your actual GitHub username.
- Replace `your_github_api_token_here` in the `.env` file with your actual GitHub API token.

This `README.md` provides an overview of the project, instructions for setup and deployment, and details about the technology stack used.
