import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Download, X } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Sidebar from '../../common/Sidebar';
import MessageBanner from '../../MessageBanner';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Performance = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [performanceData, setPerformanceData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [filterSubject, setFilterSubject] = useState('All Subjects');
    const [filterType, setFilterType] = useState('All Activity Types');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        let timeoutId;
        if (message.text) {
            timeoutId = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [message]);

    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            return null;
        }
    };

    const fetchData = useCallback(async (url, params = {}) => {
        const token = sessionStorage.getItem('jwt');
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const query = new URLSearchParams(params).toString();
        const fullUrl = query ? `${url}?${query}` : url;
        const response = await fetch(fullUrl, { headers });
        if (response.status === 401) {
            sessionStorage.removeItem('jwt');
            navigate('/login');
            return null;
        }
        const data = await response.json();
        if (response.ok && data.success) {
            return data.data;
        }
        throw new Error(data.message || `Failed to fetch data from ${url}`);
    }, [navigate]);

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            setLoading(true);

            try {
                const token = sessionStorage.getItem('jwt');
                const decoded = token ? decodeJwt(token) : null;
                const userId = Number(user?.id || decoded?.id || decoded?.sub || decoded?.userId || 1);

                const subjectsData = await fetchData(`${API_BASE_URL}/enrolled-subjects`);
                if (!subjectsData || !isMounted) return;

                const subjectNames = Array.isArray(subjectsData)
                    ? subjectsData
                        .map((s) => (typeof s === 'string' ? s : s.subjectName || s.subject?.subjectName))
                        .filter(Boolean)
                        .sort()
                    : [];

                const allPerformance = await fetchData(`${API_BASE_URL}/performance`, { userId, size: 1000 });
                if (!allPerformance || !isMounted) return;

                const types = [
                    'All Activity Types',
                    ...new Set((allPerformance.content || []).map((record) => record.activityType).filter(Boolean)),
                ];

                const params = {
                    userId,
                    page: currentPage,
                    size: pageSize,
                };
                if (filterSubject !== 'All Subjects') params.subjectName = filterSubject;
                if (filterType !== 'All Activity Types') params.activityType = filterType;
                if (startDate) params.startDate = startDate;
                if (endDate) params.endDate = endDate;

                const performancePage = await fetchData(`${API_BASE_URL}/performance`, params);
                if (!performancePage || !isMounted) return;

                const normalized = Array.isArray(performancePage.content)
                    ? performancePage.content.map((record) => ({
                        id: record.id,
                        subject: record.subjectName,
                        activityType: record.activityType,
                        activityName: record.activityName,
                        date: record.date,
                        score: Number(record.score || 0),
                    }))
                    : [];

                const summary = subjectNames
                    .filter((subjectName) => filterSubject === 'All Subjects' || subjectName === filterSubject)
                    .map((subjectName) => {
                        const records = normalized.filter((record) => record.subject === subjectName);
                        const avgScore = records.length
                            ? records.reduce((sum, record) => sum + (record.score || 0), 0) / records.length
                            : 0;
                        return {
                            subject: subjectName,
                            activities: records.length,
                            avgScore,
                        };
                    });

                setEnrolledSubjects(['All Subjects', ...subjectNames]);
                setActivityTypes(types);
                setPerformanceData(normalized);
                setSummaryData(summary);
                setTotalPages(Math.max(1, performancePage.totalPages || 1));
            } catch (error) {
                if (isMounted) {
                    setMessage({ text: `Error fetching data: ${error.message}`, type: 'error' });
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadData();
        return () => {
            isMounted = false;
        };
    }, [API_BASE_URL, user, currentPage, filterSubject, filterType, startDate, endDate, fetchData]);

    const clearFilters = () => {
        setFilterSubject('All Subjects');
        setFilterType('All Activity Types');
        setStartDate('');
        setEndDate('');
        setCurrentPage(0);
    };

    const exportToCSV = () => {
        const headers = ['Subject', 'Activity Type', 'Activity Name', 'Date', 'Score'];
        const rows = performanceData.map((record) => [
            record.subject,
            record.activityType,
            record.activityName,
            record.date ? new Date(record.date).toLocaleDateString('en-CA') : 'N/A',
            record.score,
        ]);
        const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `performance_data_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const chartData = useMemo(() => ({
        labels: summaryData.map((item) => item.subject),
        datasets: [
            {
                label: 'Average Score (%)',
                data: summaryData.map((item) => Number(item.avgScore.toFixed(0))),
                backgroundColor: '#22c55e',
                borderRadius: 8,
            },
        ],
    }), [summaryData]);

    const chartOptions = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    }), []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />

            <main className="flex-1 overflow-auto">
                <div className="border-b border-border/50 bg-card px-8 py-8">
                    <h1 className="text-4xl font-bold text-foreground">Performance</h1>
                    <p className="mt-2 text-muted-foreground">
                        Track your progress, {user?.firstName || user?.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : user?.email || 'Student'}!
                    </p>
                </div>

                <div className="mx-auto max-w-6xl space-y-8 px-8 py-8">
                    <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <h2 className="mb-2 text-2xl font-bold text-foreground">Performance Dashboard</h2>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Filter and sort your performance data to analyze your progress.
                        </p>

                        <div className="mb-8 rounded-xl border border-border/50 bg-muted/40 p-4">
                            <p className="text-sm text-foreground">
                                <span className="font-semibold">NB:</span> Performance records help you identify strengths and areas for improvement.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 font-bold text-foreground">Quick Tips</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li>&bull; Filter by subject, activity type and dates to view relevant performance records.</li>
                                <li>&bull; Clear filters using the <span className="font-semibold text-foreground">Clear Filters</span> button.</li>
                                <li>&bull; Export external performance data to CSV with the <span className="font-semibold text-foreground">Export to CSV</span> button.</li>
                                <li>&bull; Check resource details for more information.</li>
                            </ul>
                        </div>

                        <MessageBanner message={message.text} type={message.type} />

                        <div className="mb-6 flex flex-wrap items-end gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground">Filter by Subject</label>
                                <select
                                    value={filterSubject}
                                    onChange={(e) => {
                                        setFilterSubject(e.target.value);
                                        setCurrentPage(0);
                                    }}
                                    className="min-w-[180px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    {enrolledSubjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground">Filter by Activity Type</label>
                                <select
                                    value={filterType}
                                    onChange={(e) => {
                                        setFilterType(e.target.value);
                                        setCurrentPage(0);
                                    }}
                                    className="min-w-[200px] rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                >
                                    {activityTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => {
                                        setStartDate(e.target.value);
                                        setCurrentPage(0);
                                    }}
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-foreground">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => {
                                        setEndDate(e.target.value);
                                        setCurrentPage(0);
                                    }}
                                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="self-end rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/80"
                            >
                                <span className="inline-flex items-center gap-1.5">
                                    <X className="h-4 w-4" />
                                    Clear Filters
                                </span>
                            </button>
                        </div>

                        <div className="mb-8">
                            <button
                                type="button"
                                onClick={exportToCSV}
                                className="rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/80"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    Export to CSV
                                </span>
                            </button>
                        </div>

                        <h3 className="mb-4 text-xl font-bold text-foreground">Performance Data</h3>
                        <div className="overflow-hidden rounded-xl border border-border/50">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                        <th className="px-5 py-3 text-left font-semibold">Subject</th>
                                        <th className="px-5 py-3 text-left font-semibold">Activity Type</th>
                                        <th className="px-5 py-3 text-left font-semibold">Activity Name</th>
                                        <th className="px-5 py-3 text-left font-semibold">Date</th>
                                        <th className="px-5 py-3 text-left font-semibold">Score (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {performanceData.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">
                                                No performance data found for selected filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        performanceData.map((row, index) => (
                                            <tr key={row.id} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                                                <td className="px-5 py-3 text-foreground">{row.subject}</td>
                                                <td className="px-5 py-3 text-foreground">{row.activityType}</td>
                                                <td className="px-5 py-3 text-foreground">{row.activityName}</td>
                                                <td className="px-5 py-3 text-muted-foreground">
                                                    {row.date ? new Date(row.date).toLocaleDateString('en-CA') : 'N/A'}
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className={`font-semibold ${row.score >= 50 ? 'text-primary' : 'text-rose-500'}`}>
                                                        {row.score}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-xl font-bold text-foreground">Summary of Activities per Subject</h2>
                        <div className="mb-10 overflow-hidden rounded-xl border border-border/50">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-primary text-primary-foreground">
                                        <th className="px-5 py-3 text-left font-semibold">Subject</th>
                                        <th className="px-5 py-3 text-left font-semibold">Number of Activities</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {summaryData.map((row, index) => (
                                        <tr key={row.subject} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                                            <td className="px-5 py-3 text-foreground">{row.subject}</td>
                                            <td className="px-5 py-3 text-foreground">{row.activities}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="mb-6 text-xl font-bold text-foreground">Average Scores by Subject</h2>
                        <div className="rounded-xl border border-border/50 bg-muted/20 p-6">
                            <div className="h-80">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-6 flex items-center justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => Math.max(0, page - 1))}
                                    disabled={currentPage === 0}
                                    className="rounded-xl bg-muted px-5 py-3 text-sm font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-muted-foreground">Page {currentPage + 1} of {totalPages}</span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => Math.min(totalPages - 1, page + 1))}
                                    disabled={currentPage >= totalPages - 1}
                                    className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

Performance.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }),
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Performance;
