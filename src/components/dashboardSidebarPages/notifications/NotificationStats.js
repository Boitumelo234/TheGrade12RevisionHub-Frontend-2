import React from 'react';
import PropTypes from 'prop-types';

const NotificationStats = ({ totalNotifications, unreadNotifications, readNotifications }) => (
    <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-[var(--bg-primary)] p-4 text-center">
            <p className="text-sm text-[var(--text-secondary)]">Total</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{totalNotifications}</p>
        </div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-sm font-medium text-blue-600">Unread</p>
            <p className="text-2xl font-bold text-blue-600">{unreadNotifications}</p>
        </div>
        <div className="rounded-lg bg-[var(--bg-primary)] p-4 text-center">
            <p className="text-sm text-[var(--text-secondary)]">Read</p>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{readNotifications}</p>
        </div>
    </div>
);

NotificationStats.propTypes = {
    totalNotifications: PropTypes.number.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    readNotifications: PropTypes.number.isRequired,
};

export default NotificationStats;
