import React from 'react';


const ContributionStats = ({ data }) => {
    const totalContributions = data.commits.length + data.pullRequests.length + data.issues.length;
    const mostActiveDay = data.dates[data.contributions.indexOf(Math.max(...data.contributions))];

    return (
        <div className="contribution-stats">
            <h3>Total Contributions: {totalContributions}</h3>
            <p>Most Active Day: {new Date(mostActiveDay).toLocaleDateString()}</p>
        </div>
    );
};

export default ContributionStats;
