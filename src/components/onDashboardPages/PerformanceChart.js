import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const PerformanceChart = ({ darkMode, API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262' }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const textColor = useMemo(() => (darkMode ? '#cbd5e1' : '#6b7280'), [darkMode]);
    const gridColor = useMemo(() => (darkMode ? '#334155' : '#e5e7eb'), [darkMode]);
    const barColor = useMemo(() => (darkMode ? '#22c55e' : '#16a34a'), [darkMode]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            setLoading(true);
            try {
                const jwt = sessionStorage.getItem('jwt');
                if (!jwt) {
                    setCourses([]);
                    return;
                }

                const response = await fetch(`${API_BASE_URL}/api/user/subject-mastery`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Content-Type': 'application/json',
                    },
                });

                const text = await response.text();
                const data = JSON.parse(text);

                if (response.ok && data.success) {
                    setCourses(data.data.map((item) => ({
                        subjectName: item.subjectName,
                        progress: Math.round(item.progress),
                    })));
                } else {
                    setCourses([]);
                }
            } catch (error) {
                console.error(`Error fetching subject mastery data: ${error.message}`);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPerformanceData();
    }, [API_BASE_URL]);

    const sortedCourses = useMemo(() => [...courses].sort((a, b) => b.progress - a.progress), [courses]);

    const data = useMemo(() => ({
        labels: sortedCourses.map((course) => (
            course.subjectName.length > 14 ? `${course.subjectName.slice(0, 12)}..` : course.subjectName
        )),
        datasets: [
            {
                label: 'Progress (%)',
                data: sortedCourses.map((course) => course.progress),
                backgroundColor: barColor,
                borderRadius: 8,
                borderSkipped: false,
            },
        ],
    }), [barColor, sortedCourses]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: textColor,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw}%`,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    color: textColor,
                    stepSize: 20,
                    callback: (value) => `${value}%`,
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: gridColor,
                },
                border: {
                    display: false,
                },
            },
        },
    }), [gridColor, textColor]);

    if (loading) {
        return (
            <section className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
                <div className="h-80 w-full animate-pulse rounded-xl bg-[color:rgba(243,244,246,0.7)]" />
            </section>
        );
    }

    return (
        <section className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">Performance Overview</h2>
                <p className="text-sm text-[var(--text-secondary)]">Course Performance</p>
            </div>

            <div className="h-80 w-full">
                <Bar data={data} options={options} />
            </div>
        </section>
    );
};

PerformanceChart.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    API_BASE_URL: PropTypes.string,
};

PerformanceChart.defaultProps = {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:6262',
};

export default PerformanceChart;
