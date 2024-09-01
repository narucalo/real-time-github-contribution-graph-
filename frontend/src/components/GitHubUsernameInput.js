import React, { useState } from 'react';

const GitHubUsernameInput = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9-]+$/; // GitHub usernames can contain alphanumeric characters and hyphens
        return regex.test(username);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateUsername(username)) {
            setError('');
            onSubmit(username); // Call the parent function to handle the API request
        } else {
            setError('Invalid GitHub username.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Fetch Contributions</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default GitHubUsernameInput;
