const axios = require('axios');
const moment = require('moment');
const { processAndAggregateData } = require('./processAndAggregateData');

// Function to fetch GitHub events for a specific user
const fetchGitHubEvents = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching GitHub events:', error.message);
        return null;
    }
};

// Function to process and aggregate contributions
const getContributions = async (username, startDate, endDate) => {
    const events = await fetchGitHubEvents(username);

    if (!events) {
        throw new Error('Failed to fetch GitHub events.');
    }

    const filteredEvents = events.filter(event => {
        const eventDate = moment(event.created_at);
        return eventDate.isBetween(startDate, endDate, null, '[]');
    });

    const aggregatedData = processAndAggregateData(filteredEvents);

    return aggregatedData;
};

module.exports = {
    fetchGitHubEvents,
    getContributions,
};
