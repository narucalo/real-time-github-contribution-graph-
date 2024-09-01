const axios = require('axios');

// Load environment variables
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Function to fetch data using GitHub REST API
async function fetchContributionsREST(username) {
    try {
        const url = `https://api.github.com/users/${username}/events`;
        const response = await axios.get(url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        });

        // Parse the response data to extract relevant contributions
        const contributions = response.data.filter(event => event.type === 'PushEvent');
        const commitCount = contributions.length;

        return { contributions, commitCount };
    } catch (error) {
        console.error('Error fetching data from GitHub REST API:', error.message);
        throw new Error('Failed to fetch data from GitHub REST API.');
    }
}

// Function to fetch data using GitHub GraphQL API
async function fetchContributionsGraphQL(username) {
    try {
        const query = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                  }
                }
              }
            }
          }
        }`;

        const response = await axios.post(
            'https://api.github.com/graphql',
            { query },
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                },
            }
        );

        // Parse the response data to extract relevant contributions
        const contributions = response.data.data.user.contributionsCollection.contributionCalendar;
        const totalContributions = contributions.totalContributions;

        return { contributions, totalContributions };
    } catch (error) {
        console.error('Error fetching data from GitHub GraphQL API:', error.message);
        throw new Error('Failed to fetch data from GitHub GraphQL API.');
    }
}

module.exports = {
    fetchContributionsREST,
    fetchContributionsGraphQL,
};
