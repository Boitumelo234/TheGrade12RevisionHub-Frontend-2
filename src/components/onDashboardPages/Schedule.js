import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, List, Pencil, Plus, Trash2 } from 'lucide-react';
import ScheduleForm from './ScheduleForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const Schedule = ({ schedule: propSchedule, darkMode }) => {
    const weekDays = [
        { short: 'M', full: 'Monday' },
        { short: 'T', full: 'Tuesday' },
        { short: 'W', full: 'Wednesday' },
        { short: 'Th', full: 'Thursday' },
        { short: 'F', full: 'Friday' },
        { short: 'S', full: 'Saturday' },
        { short: 'Su', full: 'Sunday' },
    ];

    const [schedule, setSchedule] = useState([]);
    const [selectedDay, setSelectedDay] = useState(() => {
        const dayIndex = new Date().getDay();
        return dayIndex === 0 ? 'Su' : weekDays[dayIndex - 1].short;
    });
    const [viewMode, setViewMode] = useState('list');
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [operationLoading, setOperationLoading] = useState(false);
    const [operationError, setOperationError] = useState('');

    const normalizeTime = (time) => {
        if (!time) return '00:00:00';
        const parts = time.split(':');
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}:${parts[2] || '00'}` : '00:00:00';
    };

    const mapFallback = useCallback(() => (
        propSchedule.map((item, index) => ({
            id: `fallback-${index}`,
            day: item.day,
            course: item.course,
            time: item.time,
        }))
    ), [propSchedule]);

    const loadSchedules = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            const response = await fetch(`${API_BASE_URL}/api/user/schedule/get-schedules`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (!result.data || !Array.isArray(result.data)) {
                throw new Error('Invalid response format');
            }

            setSchedule(result.data.map((item) => ({
                id: item.id,
                day: item.dayOfWeek,
                course: item.subject,
                time: `${normalizeTime(item.startTime)}-${normalizeTime(item.endTime)}`,
            })));
        } catch (fetchError) {
            console.error('Error fetching schedules:', fetchError);
            setError('Failed to load schedules. Using fallback data.');
            setSchedule(mapFallback());
        } finally {
            setLoading(false);
        }
    }, [mapFallback]);

    useEffect(() => {
        loadSchedules();
    }, [loadSchedules]);

    const handleCreateOrUpdateSchedule = async (formData) => {
        try {
            setOperationLoading(true);
            setOperationError('');
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            const response = await fetch(
                formData.scheduleId
                    ? `${API_BASE_URL}/api/user/schedule/update-schedule`
                    : `${API_BASE_URL}/api/user/schedule/create-schedule`,
                {
                    method: formData.scheduleId ? 'PUT' : 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        scheduleId: formData.scheduleId,
                        subject: formData.subject,
                        dayOfWeek: formData.dayOfWeek,
                        startTime: formData.startTime,
                        endTime: formData.endTime,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (!result.data) {
                throw new Error('Invalid response format');
            }

            const newSchedule = {
                id: result.data.id,
                day: result.data.dayOfWeek,
                course: result.data.subject,
                time: `${normalizeTime(result.data.startTime)}-${normalizeTime(result.data.endTime)}`,
            };

            setSchedule((current) => (
                formData.scheduleId
                    ? current.map((item) => (item.id === formData.scheduleId ? newSchedule : item))
                    : [...current, newSchedule]
            ));
            setEditingSchedule(null);
            setShowForm(false);
        } catch (saveError) {
            console.error('Error saving schedule:', saveError);
            setOperationError('Failed to save schedule. Please try again.');
        } finally {
            setOperationLoading(false);
        }
    };

    const handleEditSchedule = (scheduleItem) => {
        const [startTime, endTime] = scheduleItem.time.split('-');
        setEditingSchedule({
            scheduleId: scheduleItem.id,
            subject: scheduleItem.course,
            dayOfWeek: scheduleItem.day,
            startTime: normalizeTime(startTime),
            endTime: normalizeTime(endTime),
        });
        setShowForm(true);
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            setOperationLoading(true);
            setOperationError('');
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            const response = await fetch(`${API_BASE_URL}/api/user/schedule/delete-schedule/${scheduleId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setSchedule((current) => current.filter((item) => item.id !== scheduleId));
        } catch (deleteError) {
            console.error('Error deleting schedule:', deleteError);
            setOperationError('Failed to delete schedule. Please try again.');
        } finally {
            setOperationLoading(false);
        }
    };

    const filteredSchedule = schedule.filter((item) => item.day === selectedDay);

    if (loading) {
        return (
            <section className={`rounded-2xl border p-6 shadow-sm ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-[color:rgba(237,237,238,0.9)] bg-white'}`}>
                <div className="animate-pulse text-[var(--text-secondary)]">Loading schedules...</div>
            </section>
        );
    }

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="mb-1 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-[var(--accent-secondary)]" />
                        <span className="font-semibold text-[var(--text-primary)]">Schedule</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">Plan, review and adjust your study slots.</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    disabled={operationLoading}
                    className={`rounded-xl bg-[var(--accent-primary)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--hover-primary)] ${operationLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    <Plus className="mr-1 inline h-4 w-4" />
                    Add Schedule
                </button>
            </div>

            {error && (
                <div className="mb-4 flex items-center justify-between rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    <span>{error}</span>
                    <button onClick={loadSchedules} className="rounded-lg border border-red-200 bg-white px-3 py-1">
                        Retry
                    </button>
                </div>
            )}

            {operationError && (
                <div className="mb-4 flex items-center justify-between rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    <span>{operationError}</span>
                    <button onClick={() => setOperationError('')} className="rounded-lg border border-red-200 bg-white px-3 py-1">
                        Close
                    </button>
                </div>
            )}

            {showForm && (
                <ScheduleForm
                    onSubmit={handleCreateOrUpdateSchedule}
                    initialData={editingSchedule}
                    onCancel={() => {
                        setEditingSchedule(null);
                        setShowForm(false);
                        setOperationError('');
                    }}
                    darkMode={darkMode}
                />
            )}

            <div className="mb-4 flex gap-2">
                {weekDays.map((day) => (
                    <button
                        key={day.short}
                        onClick={() => setSelectedDay(day.short)}
                        className={`h-10 w-10 rounded-xl text-sm font-medium transition-all ${
                            selectedDay === day.short
                                ? 'bg-[var(--accent-primary)] text-white'
                                : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[color:rgba(229,231,235,0.9)]'
                        }`}
                    >
                        {day.short}
                    </button>
                ))}
            </div>

            <button
                onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                className="mb-4 inline-flex w-fit items-center rounded-xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] px-3 py-2 text-sm font-medium text-[var(--text-primary)]"
            >
                <List className="mr-1 h-4 w-4" />
                {viewMode === 'list' ? 'List View' : 'Calendar View'}
            </button>

            {viewMode === 'list' ? (
                filteredSchedule.length > 0 ? (
                    <div className="space-y-3">
                        {filteredSchedule.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[color:rgba(243,244,246,0.35)] p-4"
                            >
                                <div>
                                    <p className="font-semibold text-[var(--text-primary)]">{item.course}</p>
                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.time}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEditSchedule(item)}
                                        className="rounded-lg p-2 text-[var(--accent-primary)] transition-colors hover:bg-[color:rgba(22,163,74,0.08)]"
                                        disabled={operationLoading}
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSchedule(item.id)}
                                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                                        disabled={operationLoading}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-32 items-center justify-center rounded-xl bg-[color:rgba(243,244,246,0.5)]">
                        <p className="text-sm text-[var(--text-secondary)]">No schedule for this day.</p>
                    </div>
                )
            ) : (
                <div className="flex h-32 items-center justify-center rounded-xl bg-[color:rgba(243,244,246,0.5)]">
                    <p className="text-sm text-[var(--text-secondary)]">Calendar view coming soon!</p>
                </div>
            )}
        </div>
    );
};

Schedule.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            course: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default Schedule;
