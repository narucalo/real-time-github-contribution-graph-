const express = require('express');
const redis = require('redis');
const moment = require('moment');
const { fetchGitHubEvents } = require('../utils/githubHelpers');
const { processAndAggregateData } = require('../utils/processAndAggregateData');

const router = express.Router();

// Create a Redis client
const redisClient = redis.createClient();

router.get('/', async (req, res) => {
    const { username, start_date, end_date } = req.query;

    // Validate the input parameters
    if (!username) {
        return res.status(400).json({ error: 'GitHub username is required.' });
    }
    if (!moment(start_date, 'YYYY-MM-DD', true).isValid() || !moment(end_date, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // Cache key based on username, start_date, and end_date
    const cacheKey = `contributions:${username}:${start_date}:${end_date}`;

    try {
        // Check for cached data
        redisClient.get(cacheKey, async (err, cachedData) => {
            if (err) throw err;

            if (cachedData) {
                // Return cached data if available
                return res.json(JSON.parse(cachedData));
            }

            // Fetch raw events from GitHub API
            const events = await fetchGitHubEvents(username);
            if (!events) {
                return res.status(500).json({ error: 'Failed to fetch data from GitHub API.' });
            }

            // Process and aggregate the events
            const aggregatedData = processAndAggregateData(events);

            // Prepare API response with metadata
            const response = {
                contributions: aggregatedData,
                metadata: {
                    username: username,
                    repository: "N/A", // Optional: include specific repository name if applicable
                    timeframe: `${start_date} to ${end_date}`
                }
            };

            // Cache the aggregated data with a TTL (e.g., 1 hour)
            redisClient.setex(cacheKey, 3600, JSON.stringify(response));

            // Send the response to the frontend
            res.json(response);
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the contribution data.' });
    }
});

module.exports = router;
