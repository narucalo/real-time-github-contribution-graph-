const moment = require('moment');

/**
 * Groups and aggregates contributions by date.
 * @param {Array} events - Array of GitHub events.
 * @returns {Object} Aggregated data formatted for a heatmap.
 */
function processAndAggregateData(events) {
    // Initialize an object to store contributions by date
    const contributionsByDate = {};

    // Iterate over the events
    events.forEach(event => {
        const eventDate = moment(event.created_at).format('YYYY-MM-DD');

        // Initialize the date entry if it doesn't exist
        if (!contributionsByDate[eventDate]) {
            contributionsByDate[eventDate] = {
                commits: 0,
                pullRequests: 0,
                issues: 0,
                codeReviews: 0,
            };
        }

        // Aggregate contributions based on event type
        switch (event.type) {
            case 'PushEvent':
                contributionsByDate[eventDate].commits += event.payload.commits.length;
                break;
            case 'PullRequestEvent':
                contributionsByDate[eventDate].pullRequests += 1;
                break;
            case 'IssuesEvent':
                contributionsByDate[eventDate].issues += 1;
                break;
            case 'PullRequestReviewEvent':
                contributionsByDate[eventDate].codeReviews += 1;
                break;
            default:
                break;
        }
    });

    // Convert the object to an array sorted by date
    const sortedContributions = Object.keys(contributionsByDate)
        .sort((a, b) => moment(a).diff(moment(b)))
        .map(date => ({
            date,
            ...contributionsByDate[date],
        }));

    return sortedContributions;
}

module.exports = {
    processAndAggregateData,
};
