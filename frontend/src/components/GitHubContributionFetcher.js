import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { GitHubUsernameInput, ContributionHeatmap } from '.';
import useAlert from '../hooks/useAlert';

const GitHubContributionFetcher = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { alert, showAlert, hideAlert } = useAlert();

    useEffect(() => {
        // Establish WebSocket connection
        const socket = io('http://localhost:5000');

        // Listen for updates from the backend
        socket.on('update', (newData) => {
            console.log('Received new data:', newData);
            setData(newData);
        });

        // Clean up on component unmount
        return () => socket.disconnect();
    }, []);

    const fetchContributions = async (username, startDate, endDate) => {
        setLoading(true);
        hideAlert();
        try {
            const response = await axios.get('/api/contributions', {
                params: {
                    username,
                    start_date: startDate,
                    end_date: endDate
                }
            });
            setData(response.data.contributions);
        } catch (error) {
            showAlert({ text: 'Failed to fetch data. Please try again.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <GitHubUsernameInput onSubmit={fetchContributions} />
            {loading && <p>Loading...</p>}
            {alert.show && <p className={`alert alert-${alert.type}`}>{alert.text}</p>}
            {data && (
                <>
                    <h2>Contribution Heatmap</h2>
                    <ContributionHeatmap data={data} />
                </>
            )}
        </div>
    );
};

export default GitHubContributionFetcher;
