import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Plus, X } from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import SubjectForm from './SubjectForm';
import MessageBanner from '../../MessageBanner';

const Subjects = ({
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
    const [subjects, setSubjects] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const fetchData = async (url, setData) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, { headers });
            const data = await response.json();

            if (response.ok && data.success) {
                setData(data.data || []);
            } else {
                setMessage({ text: data.message || `Failed to fetch data from ${url}`, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error fetching data: ${error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        fetchData(`${API_BASE_URL}/subjects`, setSubjects);
        fetchData(`${API_BASE_URL}/enrolled-subjects`, (data) => {
            const subjectNames = Array.isArray(data) ? data.map((s) => s.subjectName || s) : [];
            setEnrolledSubjects(subjectNames);
        });
    }, [API_BASE_URL]);

    useEffect(() => {
        let timeoutId;
        if (message.text) {
            timeoutId = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [message]);

    const handleAddSubject = async (e) => {
        e.preventDefault();

        if (!selectedSubject) {
            setMessage({ text: 'Please select a subject', type: 'error' });
            return;
        }

        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };

            const response = await fetch(`${API_BASE_URL}/add-subject`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ subjectName: selectedSubject }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                fetchData(`${API_BASE_URL}/enrolled-subjects`, (updatedData) => {
                    const subjectNames = Array.isArray(updatedData)
                        ? updatedData.map((s) => s.subjectName || s)
                        : [];
                    setEnrolledSubjects(subjectNames);
                });
                setMessage({ text: data.message, type: 'success' });
                onActivity(`Added subject: ${selectedSubject}`);
                setSelectedSubject('');
                setIsAdding(false);
            } else {
                setMessage({ text: data.message || 'Failed to add subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error adding subject: ${error.message}`, type: 'error' });
        }
    };

    const handleRemoveSubject = async (subjectName) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };

            const response = await fetch(
                `${API_BASE_URL}/remove-subject?subjectName=${encodeURIComponent(subjectName)}`,
                {
                    method: 'DELETE',
                    headers,
                }
            );

            const data = await response.json();

            if (response.ok && data.success) {
                fetchData(`${API_BASE_URL}/enrolled-subjects`, (updatedData) => {
                    const subjectNames = Array.isArray(updatedData)
                        ? updatedData.map((s) => s.subjectName || s)
                        : [];
                    setEnrolledSubjects(subjectNames);
                });
                setMessage({ text: data.message, type: 'success' });
                onActivity(`Removed subject: ${subjectName}`);
            } else {
                setMessage({ text: data.message || 'Failed to remove subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error removing subject: ${error.message}`, type: 'error' });
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const displayName = user?.firstName || user?.lastName
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
        : user?.email || 'Student';

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
                    <h1 className="text-4xl font-bold text-foreground">Your Subjects</h1>
                    <p className="mt-2 text-muted-foreground">Manage your subjects, {displayName}!</p>
                </div>

                <div className="mx-auto max-w-6xl px-8 py-8">
                    <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold text-foreground">Your Enrolled Subjects</h2>
                        <p className="mb-6 text-sm text-muted-foreground">
                            Select subjects to explore study materials for your courses!
                        </p>

                        <div className="mb-8 rounded-xl border border-border/50 bg-muted/40 p-4">
                            <p className="text-sm text-foreground">
                                <span className="font-semibold">NB:</span> Subject resources enhance your understanding and exam readiness.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 font-bold text-foreground">Quick Tips</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>&bull; Add subject with the <span className="font-semibold text-foreground">Add New Subject</span> button in a new tab.</li>
                                <li>&bull; Access papers for the using the <span className="font-semibold text-foreground">Past papers</span> button.</li>
                                <li>&bull; Remove subject with the <span className="font-semibold text-foreground">X</span> button.</li>
                                <li>&bull; Check resource details for more information.</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <button
                                type="button"
                                onClick={() => setIsAdding((value) => !value)}
                                className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/80"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                {isAdding ? 'Cancel' : 'Add new subject'}
                            </button>
                        </div>

                        <MessageBanner message={message.text} type={message.type} />

                        {isAdding && (
                            <div className="mb-8 rounded-xl border border-border/50 bg-background p-6">
                                <SubjectForm
                                    subjects={subjects}
                                    selectedSubject={selectedSubject}
                                    onSubjectSelect={(e) => setSelectedSubject(e.target.value)}
                                    onSubmit={handleAddSubject}
                                    darkMode={darkMode}
                                />
                            </div>
                        )}

                        {enrolledSubjects.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {enrolledSubjects.map((subject, index) => (
                                    <div key={`${subject}-${index}`} className="rounded-xl border border-border/50 bg-background p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <h4 className="text-lg font-bold text-foreground">{subject}</h4>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSubject(subject)}
                                                className="flex-shrink-0 rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => navigate(`/question-papers/list/${encodeURIComponent(subject)}`)}
                                            className="w-full rounded-lg bg-muted py-2 text-sm font-medium text-foreground transition hover:bg-muted/80"
                                        >
                                            Past Papers
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">No subjects enrolled. Click &quot;Add new subject&quot; to get started!</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

Subjects.propTypes = {
    user: PropTypes.object.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    setNotifications: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default Subjects;
