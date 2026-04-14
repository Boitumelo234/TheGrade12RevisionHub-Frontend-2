import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';

const Quizzes = ({
    user,
    isCollapsed,
    setIsCollapsed,
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    onActivity,
}) => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [sortBy, setSortBy] = useState('Due Date');
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = sessionStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found');
                }

                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const subjectsResponse = await fetch(`${API_BASE_URL}/enrolled-subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (!subjectsResponse.ok || !subjectsData.success) {
                    throw new Error(subjectsData.message || 'Failed to fetch enrolled subjects');
                }

                const enrolledSubjects = (subjectsData.data || []).map((s) => s.subjectName || s).sort();
                setSubjects(enrolledSubjects);

                const quizzesResponse = await fetch(`${API_BASE_URL}/quizzes`, { headers });
                const quizzesData = await quizzesResponse.json();
                if (!quizzesResponse.ok || !quizzesData.success) {
                    throw new Error(quizzesData.message || 'Failed to fetch quizzes');
                }

                const normalizedQuizzes = (quizzesData.data || []).map((quiz) => ({
                    ...quiz,
                    subject: quiz.subject?.subjectName || quiz.subjectId || quiz.subject || 'Unknown',
                }));
                setQuizzes(normalizedQuizzes);

                if (enrolledSubjects.length === 0) {
                    setError('No enrolled subjects found. Please enroll in subjects first.');
                }
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [API_BASE_URL]);

    const filteredQuizzes = useMemo(() => {
        const visible = selectedSubject
            ? quizzes.filter((quiz) => quiz.subject === selectedSubject)
            : quizzes;

        return [...visible].sort((a, b) => {
            if (sortBy === 'Title') {
                return (a.title || '').localeCompare(b.title || '');
            }
            if (sortBy === 'Subject') {
                return (a.subject || '').localeCompare(b.subject || '');
            }
            return new Date(a.dueDate || '9999-12-31').getTime() - new Date(b.dueDate || '9999-12-31').getTime();
        });
    }, [quizzes, selectedSubject, sortBy]);

    const handleStartQuiz = (quizId, quizTitle) => {
        onActivity(`Started quiz: ${quizTitle}`);
        navigate(`/quizzes/${quizId}`);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

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
                onActivity={onActivity}
            />

            <main className="flex-1 overflow-auto">
                <div className="border-b border-border/50 bg-card px-8 py-8">
                    <h1 className="text-4xl font-bold text-foreground">Explore Quizzes</h1>
                    <p className="mt-2 text-muted-foreground">Filter by subject, due date and title to find quizzes and test your knowledge!</p>
                </div>

                <div className="mx-auto max-w-6xl px-8 py-8">
                    <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <div className="mb-6 flex items-start justify-between">
                            <div />
                            <Link
                                to="/digitized-question-papers"
                                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                            >
                                View Digitized Question Papers
                            </Link>
                        </div>

                        <div className="mb-8 rounded-xl border border-border/50 bg-muted/40 p-4">
                            <p className="text-sm text-foreground">
                                <span className="font-semibold">NB:</span> Quizzes help reinforce concepts and prepare for exams.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 font-bold text-foreground">Quick Tips</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>&bull; Filter by subject and year to find relevant quizzes.</li>
                                <li>&bull; Access online quizzes with the <span className="font-semibold text-foreground">Start Quiz</span> button.</li>
                                <li>&bull; Check quiz details for more information.</li>
                            </ul>
                        </div>

                        {error && (
                            <section className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span>{error}</span>
                                    {error.includes('No enrolled subjects') && (
                                        <Link to="/subjects" className="font-semibold underline">
                                            Enroll in subjects
                                        </Link>
                                    )}
                                </div>
                            </section>
                        )}

                        <div className="mb-8 flex flex-col items-end gap-6 md:flex-row">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">Filter by Subject</label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className="min-w-[160px] rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    disabled={subjects.length === 0}
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-foreground">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="min-w-[140px] rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    {['Due Date', 'Title', 'Subject'].map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {filteredQuizzes.length > 0 ? (
                            <div className="space-y-3">
                                {filteredQuizzes.map((quiz) => (
                                    <div key={quiz.id} className="flex items-center justify-between rounded-xl border border-border/50 bg-background p-5 transition-shadow hover:shadow-sm">
                                        <div>
                                            <p className="mb-1 text-xs font-semibold text-primary">{quiz.subject}</p>
                                            <h3 className="text-sm font-bold text-foreground">{quiz.title}</h3>
                                            <p className="mt-1 text-xs text-muted-foreground">Due: {quiz.dueDate || 'No due date'}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleStartQuiz(quiz.id, quiz.title)}
                                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No quizzes available.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

Quizzes.propTypes = {
    user: PropTypes.object.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    setNotifications: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default Quizzes;
