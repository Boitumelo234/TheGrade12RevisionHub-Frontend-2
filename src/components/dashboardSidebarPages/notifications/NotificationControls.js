import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from '../chatroom/ConfirmationModal';

const NotificationControls = ({ filterType, setFilterType, markAllAsRead, deleteAllNotifications, unreadNotifications, totalNotifications }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <div className="mb-8 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="rounded-lg border border-[rgba(229,231,235,0.9)] bg-[var(--bg-primary)] px-4 py-2 text-sm text-[var(--text-primary)]"
                    >
                        <option value="all">All Types</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                        <option value="birthday">Birthday</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                        <option value="quiz">Quiz</option>
                    </select>
                    <button
                        type="button"
                        onClick={markAllAsRead}
                        disabled={unreadNotifications === 0}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                    >
                        Mark All
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        disabled={totalNotifications === 0}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    deleteAllNotifications();
                    setIsModalOpen(false);
                }}
                title="Confirm Delete All"
                message="Are you sure you want to delete all notifications? This action cannot be undone."
            />
        </>
    );
};

NotificationControls.propTypes = {
    filterType: PropTypes.string.isRequired,
    setFilterType: PropTypes.func.isRequired,
    markAllAsRead: PropTypes.func.isRequired,
    deleteAllNotifications: PropTypes.func.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    totalNotifications: PropTypes.number.isRequired,
};

export default NotificationControls;
