
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

// GitHub API base URL
const GITHUB_API_BASE_URL = 'https://api.github.com';

// GitHub API token (optional, used for authenticated requests to increase rate limits)
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN || '';

// Create an Axios instance with default headers
const apiClient = axios.create({
    baseURL: GITHUB_API_BASE_URL,
    headers: {
        'Authorization': GITHUB_API_TOKEN ? `token ${GITHUB_API_TOKEN}` : undefined,
        'Accept': 'application/vnd.github.v3+json'
    }
});

// Function to fetch GitHub events for a specific user
const fetchUserEvents = async (username) => {
    try {
        const response = await apiClient.get(`/users/${username}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub events:', error.message);
        return null;
    }
};

// Function to fetch contribution data for a user (can be expanded as needed)
const fetchUserContributions = async (username) => {
    try {
        const response = await apiClient.get(`/users/${username}/events/public`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user contributions:', error.message);
        return null;
    }
};

module.exports = {
    fetchUserEvents,
    fetchUserContributions,
};
