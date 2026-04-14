import React from 'react';
import PropTypes from 'prop-types';
import { AlertCircle } from 'lucide-react';

const NotificationList = ({ filteredNotifications, markAsRead, deleteNotification }) => {
    const formatDate = (dateString) => {
        if (!dateString || typeof dateString !== 'string') return 'Unknown Date';
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const sortedNotifications = [...filteredNotifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (sortedNotifications.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-[var(--text-secondary)]">No notifications yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {sortedNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`rounded-lg border p-6 ${
                        notification.read
                            ? 'border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)]'
                            : 'border-blue-200 bg-blue-50'
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
                                <span className="rounded bg-[var(--bg-tertiary)] px-2 py-1 text-xs font-semibold text-[var(--text-primary)]">
                                    [{notification.type ? notification.type.toUpperCase() : 'INFO'}]
                                </span>
                            </div>
                            <p className="mb-2 text-sm text-[var(--text-primary)]">{notification.message}</p>
                            <p className="text-xs text-[var(--text-secondary)]">{formatDate(notification.createdAt)}</p>
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
            ))}
        </div>
    );
};

NotificationList.propTypes = {
    filteredNotifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.string,
        })
    ).isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
};

export default NotificationList;
