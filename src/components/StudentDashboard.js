import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookOpen, CheckCircle, CheckSquare, Trophy } from 'lucide-react';
import Sidebar from './common/Sidebar';
import Header from './common/Header';
import ProgressOverview from './onDashboardPages/ProgressOverview';
import CourseMastery from './onDashboardPages/CourseMastery';
import RecentActivity from './onDashboardPages/RecentActivity';
import Schedule from './onDashboardPages/Schedule';
import PerformanceChart from './onDashboardPages/PerformanceChart';
import StudyTimer from './onDashboardPages/StudyTimer';
import MotivationalQuote from './onDashboardPages/MotivationalQuote';
import NotificationsWidget from './onDashboardPages/NotificationsWidget';

const StatsCard = ({ icon: Icon, label, value, iconColor, iconBgColor }) => (
    <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-5 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
            <div className="space-y-1">
                <p className="text-sm font-medium text-[var(--text-secondary)]">{label}</p>
                <p className="text-3xl font-bold text-[var(--text-primary)]">{value}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: iconBgColor }}>
                <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
        </div>
    </div>
);

StatsCard.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    iconColor: PropTypes.string.isRequired,
    iconBgColor: PropTypes.string.isRequired,
};

const StudentDashboard = ({
    user,
    isCollapsed,
    setIsCollapsed,
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    onActivity,
    activities,
    setActivities,
}) => {
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [stats, setStats] = useState({
        numberOfSubjects: 0,
        attendance: '0%',
        achievements: 0,
        completedTasks: 0,
    });

    useEffect(() => {
        const savedTheme = sessionStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        setDarkMode(savedTheme === 'dark');
    }, [setDarkMode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await fetch(`${API_BASE_URL}/api/user/notifications/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
                const data = await response.json();
                setNotifications(data.map((notification) => ({
                    id: notification.id,
                    message: notification.message,
                    createdAt: notification.createdAt,
                    read: notification.read ?? false,
                    type: notification.type?.toLowerCase() || 'info',
                })));
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [API_BASE_URL, setNotifications, user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };

                const enrolledResponse = await fetch(`${API_BASE_URL}/api/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    const subjectNames = Array.isArray(enrolledData.data) ? enrolledData.data.map((subject) => subject.subjectName || subject) : [];
                    setEnrolledSubjects(subjectNames);
                    setStats((prev) => ({ ...prev, numberOfSubjects: subjectNames.length }));
                }

                const tasksResponse = await fetch(`${API_BASE_URL}/api/user/completed-tasks`, { headers });
                const tasksData = await tasksResponse.json();
                if (tasksResponse.ok && tasksData.success) {
                    setStats((prev) => ({ ...prev, completedTasks: tasksData.data }));
                }

                const coursesResponse = await fetch(`${API_BASE_URL}/api/user/courses`, { headers });
                const coursesData = await coursesResponse.json();
                if (coursesResponse.ok && coursesData.success) {
                    setCourses(coursesData.data.map((course) => ({
                        name: course.subjectName,
                        progress: course.progress,
                    })));
                }

                const attendanceResponse = await fetch(`${API_BASE_URL}/api/user/attendance`, { headers });
                const attendanceData = await attendanceResponse.json();
                if (attendanceResponse.ok && attendanceData.success) {
                    setStats((prev) => ({ ...prev, attendance: `${attendanceData.data}%` }));
                }

                const activitiesResponse = await fetch(`${API_BASE_URL}/api/user/activities`, { headers });
                const activitiesData = await activitiesResponse.json();
                if (activitiesResponse.ok && activitiesData.success) {
                    setActivities(activitiesData.data.map((activity) => ({
                        id: activity.id,
                        description: activity.description,
                        date: activity.date,
                    })));
                }

                const achievementsResponse = await fetch(`${API_BASE_URL}/api/user/certificates/count`, { headers });
                const achievementsData = await achievementsResponse.json();
                if (achievementsResponse.ok) {
                    setStats((prev) => ({ ...prev, achievements: achievementsData }));
                }

                setSchedule([
                    { day: 'T', course: 'Mathematics', time: '11:00-12:30', location: 'Room 101' },
                    { day: 'T', course: 'Geography', time: '08:00-09:30', location: 'Room 202' },
                    { day: 'T', course: 'Physical Sciences', time: '10:00-11:00', location: 'Lab A' },
                    { day: 'W', course: 'History', time: '09:00-10:30', location: 'Room 303' },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [API_BASE_URL, setActivities]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleTimerFinish = () => {
        setShowPopup(true);
        onActivity('Completed study session');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--accent-primary)]" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)]">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
                onActivity={onActivity}
            />

            <main className="flex-1 p-4 lg:p-8">
                <Header
                    user={user}
                    notifications={notifications}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    tabDescription="Student Dashboard"
                    userMessage="Welcome to dashboard"
                />

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatsCard icon={BookOpen} label="Number Of Subjects" value={stats.numberOfSubjects} iconColor="text-blue-500" iconBgColor="rgba(59,130,246,0.1)" />
                    <StatsCard icon={CheckCircle} label="Attendance" value={stats.attendance} iconColor="text-[var(--accent-primary)]" iconBgColor="rgba(22,163,74,0.1)" />
                    <StatsCard icon={Trophy} label="Achievements" value={stats.achievements} iconColor="text-amber-500" iconBgColor="rgba(245,158,11,0.1)" />
                    <StatsCard icon={CheckSquare} label="Tasks Completed" value={stats.completedTasks} iconColor="text-purple-500" iconBgColor="rgba(168,85,247,0.1)" />
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ProgressOverview courses={courses} />
                    <CourseMastery enrolledSubjects={enrolledSubjects} courses={courses} />
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Schedule schedule={schedule} darkMode={darkMode} />
                    <RecentActivity activities={activities} setActivities={setActivities} API_BASE_URL={API_BASE_URL} />
                </div>

                <div className="mb-8">
                    <PerformanceChart darkMode={darkMode} API_BASE_URL={API_BASE_URL} />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StudyTimer onTimerFinish={handleTimerFinish} />
                    <MotivationalQuote />
                    <NotificationsWidget notifications={notifications} />
                </div>
            </main>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-[var(--text-primary)] sm:text-xl">Time is up!</h3>
                        <p className="mb-4 text-sm text-[var(--text-secondary)] sm:text-base">Your study session has ended.</p>
                        <button type="button" onClick={() => setShowPopup(false)} className="w-full rounded-xl bg-[var(--accent-primary)] px-4 py-2.5 text-white" aria-label="Close popup">
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

StudentDashboard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            createdAt: PropTypes.string,
            read: PropTypes.bool.isRequired,
            type: PropTypes.string,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default StudentDashboard;
