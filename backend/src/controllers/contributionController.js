
const moment = require('moment');
const { fetchGitHubEvents } = require('./githubAPI');
const { processAndAggregateData } = require('./processAndAggregateData');
const { getFromCache, setInCache } = require('./cache');
const Contribution = require('./contributionModel'); // Make sure this import is correct

const fetchContributions = async (req, res) => {
    const { username, start_date, end_date } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'GitHub username is required.' });
    }
    if (!start_date || !end_date || !moment(start_date, 'YYYY-MM-DD', true).isValid() || !moment(end_date, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const cacheKey = `contributions:${username}:${start_date}:${end_date}`;

    try {
        const cachedData = await getFromCache(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }

        const events = await fetchGitHubEvents(username);
        if (!events) {
            return res.status(500).json({ error: 'Failed to fetch data from GitHub API.' });
        }

        const aggregatedData = processAndAggregateData(events);

        // Create a new Contribution document and save it to the database
        const newContribution = new Contribution({
            username,
            startDate,
            endDate,
            contributions: aggregatedData,
        });
        await newContribution.save();

        const response = {
            contributions: aggregatedData,
            metadata: {
                username: username,
                repository: "N/A",
                timeframe: `${start_date} to ${end_date}`
            }
        };

        await setInCache(cacheKey, response, 3600);

        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching the contribution data.' });
    }
};

module.exports = {
    fetchContributions,
};