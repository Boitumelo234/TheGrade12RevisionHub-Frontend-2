import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Clock, Download, Trash2 } from 'lucide-react';
import ConfirmationModal from '../dashboardSidebarPages/chatroom/ConfirmationModal';

const RecentActivity = ({ activities, setActivities, API_BASE_URL }) => {
    const [modalState, setModalState] = useState({ isOpen: false, type: 'confirm', message: '', title: '' });

    const handleDeleteAll = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/activities`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setActivities([]);
                setModalState({ isOpen: true, type: 'result', title: 'Success', message: 'All activities deleted successfully' });
            } else {
                setModalState({ isOpen: true, type: 'result', title: 'Error', message: data.message || 'Failed to delete activities' });
            }
        } catch (error) {
            setModalState({ isOpen: true, type: 'result', title: 'Error', message: `Failed to delete activities: ${error.message}` });
        }
    };

    const handleDownload = () => {
        const csvLines = [
            'ID,Description,Date',
            ...activities.map((activity) => [
                activity.id,
                `"${activity.description.replace(/"/g, '""')}"`,
                new Date(activity.date).toLocaleString(),
            ].join(',')),
        ];
        const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recent_activities.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-4 shadow-sm">
            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, type: '', message: '', title: '' })}
                onConfirm={modalState.type === 'confirm' ? handleDeleteAll : () => setModalState({ isOpen: false, type: '', message: '', title: '' })}
                title={modalState.title}
                message={modalState.message}
            />

            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[var(--accent-secondary)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Recent Activity</span>
                </div>
                <div className="flex gap-1">
                    {activities.length > 0 && (
                        <button className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]" onClick={handleDownload} aria-label="Download all activities">
                            <Download className="h-3.5 w-3.5" />
                        </button>
                    )}
                    {activities.length > 0 && (
                        <button
                            className="flex h-7 w-7 items-center justify-center text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                            onClick={() => setModalState({
                                isOpen: true,
                                type: 'confirm',
                                title: 'Confirm Delete',
                                message: 'Are you sure you want to delete all activities? This action cannot be undone.',
                            })}
                            aria-label="Delete all activities"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                {activities.length > 0 ? (
                    activities.slice(0, 4).map((activity) => (
                        <div key={activity.id} className="flex items-start justify-between border-b border-[color:rgba(237,237,238,0.9)] py-2 last:border-0">
                            <p className="truncate pr-2 text-xs font-medium text-[var(--text-primary)]">"{activity.description}"</p>
                            <p className="ml-2 whitespace-nowrap text-right text-xs text-[var(--text-secondary)]">{new Date(activity.date).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-[var(--text-secondary)]">No recent activity.</p>
                )}
            </div>
        </div>
    );
};

RecentActivity.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
    API_BASE_URL: PropTypes.string.isRequired,
};

export default RecentActivity;
