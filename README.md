# Real-Time GitHub Contribution Graph

## Project Overview

The Real-Time GitHub Contribution Graph is a web application that visualizes GitHub contributions in real-time. The project includes both frontend and backend components, and leverages technologies like React.js, Node.js, Express.js, MongoDB, Redis, and Docker. The backend fetches contribution data from the GitHub API, processes it, and provides real-time updates to the frontend using WebSockets.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Docker Setup](#docker-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [WebSocket Communication](#websocket-communication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Frontend

- React.js
- D3.js
- Axios
- Socket.io-client
- Styled-components

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- Axios
- Socket.io
- Docker

### Tools

- Docker & Docker Compose
- GitHub API
- WebSockets
- ESLint (Airbnb Config)
- Jest

## Features

- **Real-Time Contribution Visualization**: Visualizes GitHub contributions in real-time using a heatmap.
- **WebSocket Integration**: Enables real-time updates of contributions without refreshing the page.
- **Caching with Redis**: Caches contribution data to reduce API requests to GitHub.
- **Responsive UI**: Ensures the UI works well on various devices and screen sizes.
- **Error Handling**: Both frontend and backend handle errors gracefully with user-friendly messages.

cd backend 
npm install

cd frontend
npm install


