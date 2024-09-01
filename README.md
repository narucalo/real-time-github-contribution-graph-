Running the Application
Using Docker
You can run the entire application (backend, frontend, Redis, and MongoDB) using Docker.

Ensure Docker is running on your system.

Build and start the containers:

Navigate to the root of the project directory and run:
bash
Copy code
docker-compose up --build
Access the application:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
Stopping the containers:

Press CTRL + C in the terminal to stop the containers.
To remove all containers, networks, and volumes, run:
bash
Copy code
docker-compose down

Testing
Backend Testing
Run tests:
npm test


Frontend Testing
Run tests:
npm run test
