// frontend/src/services/apiService.js

import axios from 'axios';

/**
 * Fetch contribution data from the backend API.
 * @param {string} username - GitHub username.
 * @param {string} startDate - The start date for the contribution data (YYYY-MM-DD).
 * @param {string} endDate - The end date for the contribution data (YYYY-MM-DD).
 * @returns {Promise<Object>} - The contribution data from the backend.
 */
export const fetchContributions = async (username, startDate, endDate) => {
  try {
    const response = await axios.get('/api/contributions', {
      params: {
        username,
        start_date: startDate,
        end_date: endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    throw error;
  }
};

/**
 * Establish a WebSocket connection to receive real-time updates.
 * @param {function} onUpdate - Callback function to handle updates.
 */
export const connectWebSocket = (onUpdate) => {
  const socket = new WebSocket('ws://localhost:5000');

  // Listen for messages (updates) from the server
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onUpdate(data);
  };

  // Handle connection errors
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  // Handle connection closure
  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return socket;
};

export default {
  fetchContributions,
  connectWebSocket,
};
