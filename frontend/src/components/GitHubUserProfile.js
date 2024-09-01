import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GitHubUserProfile = ({ username }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}`);
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching user profile', err);
            }
        };
        fetchProfile();
    }, [username]);

    if (!profile) return null;

    return (
        <div className="user-profile">
            <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
            <h2>{profile.login}</h2>
            <p>{profile.bio}</p>
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer">View Profile on GitHub</a>
        </div>
    );
};

export default GitHubUserProfile;
