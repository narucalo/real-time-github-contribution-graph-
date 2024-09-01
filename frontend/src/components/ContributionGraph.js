import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

const ContributionGraph = ({ data }) => {
    useEffect(() => {
        const ctx = document.getElementById('contributionGraph').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: [
                    {
                        label: 'Commits',
                        data: data.commits,
                        borderColor: 'blue',
                        fill: false,
                    },
                    {
                        label: 'Pull Requests',
                        data: data.pullRequests,
                        borderColor: 'green',
                        fill: false,
                    },
                    {
                        label: 'Issues',
                        data: data.issues,
                        borderColor: 'red',
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                        },
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            chart.destroy();
        };
    }, [data]);

    return <canvas id="contributionGraph"></canvas>;
};

export default ContributionGraph;
