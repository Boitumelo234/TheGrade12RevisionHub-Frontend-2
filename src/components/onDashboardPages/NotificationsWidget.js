import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AlertTriangle, Bell } from 'lucide-react';

const NotificationsWidget = ({ notifications }) => (
    <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-[var(--accent-primary)]" />
            <span className="font-semibold text-[var(--text-primary)]">Notifications</span>
        </div>

        <ul className="space-y-4">
            {notifications.length > 0 ? (
                notifications.slice(0, 2).map((notification) => (
                    <li
                        key={notification.id}
                        className="flex items-start gap-3 rounded-xl bg-[color:rgba(243,244,246,0.7)] p-3"
                    >
                        {notification.type === 'warning' ? (
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                        ) : (
                            <span className="text-lg">{'\uD83D\uDCDA'}</span>
                        )}
                        <p className="text-sm text-[var(--text-primary)]">{notification.message}</p>
                    </li>
                ))
            ) : (
                <p className="text-center text-[var(--text-secondary)]">No notifications.</p>
            )}
        </ul>

        <Link
            to="/notifications"
            className="mt-4 block w-full text-center text-sm font-medium text-[var(--accent-primary)] transition-colors hover:opacity-80"
        >
            View All Notifications
        </Link>
    </div>
);

NotificationsWidget.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string,
            type: PropTypes.string,
        })
    ).isRequired,
};

export default NotificationsWidget;
