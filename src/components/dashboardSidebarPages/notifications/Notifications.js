import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from '../../common/Sidebar';

const Notifications = ({
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        let stompClient = null;

        const connect = () => {
            const socket = new SockJS(`${API_BASE_URL}/ws`);
            stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                connectHeaders: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                },
                onConnect: () => {
                    if (user) {
                        stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
                            const data = JSON.parse(message.body);
                            if (data.message && data.type === 'INFO') {
                                if (data.message === 'All notifications cleared') {
                                    setNotifications([]);
                                } else if (data.message === 'Notification deleted') {
                                    setNotifications((prev) => prev.filter((n) => n.id !== Number(data.id)));
                                } else if (data.message === 'All notifications marked as read') {
                                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                                }
                            } else if (data.id && data.isRead !== undefined) {
                                setNotifications((prev) =>
                                    prev.map((n) => (n.id === Number(data.id) ? { ...n, read: data.isRead } : n))
                                );
                            } else if (data.id) {
                                setNotifications((prev) => {
                                    const exists = prev.find((n) => n.id === Number(data.id));
                                    if (exists) {
                                        return prev.map((n) =>
                                            n.id === Number(data.id) ? { ...n, ...data, read: data.isRead || n.read } : n
                                        );
                                    }
                                    return [
                                        ...prev,
                                        { ...data, type: data.type?.toLowerCase() || 'info', read: data.isRead || false },
                                    ];
                                });
                            }
                        });
                    }
                },
                onStompError: () => {
                    setError('WebSocket connection failed');
                    setTimeout(connect, 5000);
                },
            });
            stompClient.activate();
        };

        connect();
        return () => {
            if (stompClient) stompClient.deactivate();
        };
    }, [API_BASE_URL, setNotifications, user]);

    useEffect(() => {
        window.sessionStorage.removeItem('notifications');
        const fetchNotifications = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);
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
                const normalizedData = data.map((notification) => ({
                    id: notification.id,
                    message: notification.message,
                    createdAt: notification.createdAt,
                    read: notification.hasOwnProperty('read') ? notification.read : false,
                    type: notification.type?.toLowerCase() || 'info',
                }));
                setNotifications(normalizedData);
            } catch (fetchError) {
                setError(`Error fetching notifications: ${fetchError.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [API_BASE_URL, setNotifications, user]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const markAsRead = async (id) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/api/user/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to mark notification as read: ${response.status}`);
            }
            setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
        } catch {
            setError('Error marking notification as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/api/user/notifications/read/all/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to mark all notifications as read: ${response.status}`);
            }
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
            onActivity('Marked all notifications as read');
        } catch {
            setError('Error marking all notifications as read');
        }
    };

    const deleteNotification = async (id) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/api/user/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete notification');
            }
            setNotifications(notifications.filter((n) => n.id !== id));
        } catch {
            setError('Error deleting notification');
        }
    };

    const deleteAllNotifications = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/api/user/notifications/all/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete all notifications');
            }
            setNotifications([]);
            onActivity('Deleted all notifications');
        } catch {
            setError('Error deleting all notifications');
        }
    };

    const totalNotifications = notifications.length;
    const unreadCount = notifications.filter((n) => !n.read).length;
    const readCount = notifications.filter((n) => n.read).length;

    const filteredNotifications = useMemo(() => {
        if (filter === 'read') return notifications.filter((n) => n.read);
        if (filter === 'unread') return notifications.filter((n) => !n.read);
        if (filter === 'all') return notifications;
        return notifications.filter((n) => n.type === filter);
    }, [filter, notifications]);

    const sortedNotifications = useMemo(
        () => [...filteredNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        [filteredNotifications]
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return 'Unknown date';
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    if (loading || !user) {
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
                    <h1 className="text-4xl font-bold text-foreground">Notifications</h1>
                    <p className="mt-2 text-muted-foreground">Stay updated, {`${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email}!</p>
                </div>

                <div className="mx-auto max-w-4xl px-8 py-8">
                    <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-foreground">Your Notifications</h2>
                            <div className="flex gap-2">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground"
                                >
                                    <option value="all">All Types</option>
                                    <option value="info">Info</option>
                                    <option value="warning">Warning</option>
                                    <option value="error">Error</option>
                                    <option value="read">Read</option>
                                    <option value="unread">Unread</option>
                                </select>
                                <button
                                    type="button"
                                    onClick={markAllAsRead}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    Mark All
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteAllNotifications}
                                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                                >
                                    Delete All
                                </button>
                            </div>
                        </div>

                        {error && <p className="mb-6 text-sm text-red-600">{error}</p>}

                        <div className="mb-8 grid grid-cols-3 gap-4">
                            <div className="rounded-lg bg-muted p-4 text-center">
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-2xl font-bold text-foreground">{totalNotifications}</p>
                            </div>
                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
                                <p className="text-sm font-medium text-blue-600">Unread</p>
                                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
                            </div>
                            <div className="rounded-lg bg-muted p-4 text-center">
                                <p className="text-sm text-muted-foreground">Read</p>
                                <p className="text-2xl font-bold text-foreground">{readCount}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {sortedNotifications.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">No notifications yet.</p>
                                </div>
                            ) : (
                                sortedNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`rounded-lg border p-6 ${
                                            notification.read ? 'border-border/50 bg-background' : 'border-blue-200 bg-blue-50'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <AlertCircle
                                                className={`mt-1 h-5 w-5 flex-shrink-0 ${
                                                    notification.type === 'warning' ? 'text-yellow-600' : 'text-green-600'
                                                }`}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="rounded bg-muted px-2 py-1 text-xs font-semibold text-foreground">
                                                        [{notification.type ? notification.type.toUpperCase() : 'INFO'}]
                                                    </span>
                                                </div>
                                                <p className="mb-2 text-sm text-foreground">{notification.message}</p>
                                                <p className="text-xs text-muted-foreground">{formatDate(notification.createdAt)}</p>
                                            </div>
                                            <div className="flex flex-shrink-0 gap-2">
                                                {!notification.read && (
                                                    <button
                                                        type="button"
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
                                                    >
                                                        Mark as Read
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="text-sm font-medium text-red-500 transition hover:text-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

Notifications.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
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
    onActivity: PropTypes.func.isRequired,
};

export default Notifications;
