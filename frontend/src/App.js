import React from 'react';
import GitHubContributionFetcher from './components/GitHubContributionFetcher';

const App = () => {
    return (
        <div>
            <h1>Real-Time GitHub Contribution Graph</h1>
            <GitHubContributionFetcher />
        </div>
    );
};

export default App;
