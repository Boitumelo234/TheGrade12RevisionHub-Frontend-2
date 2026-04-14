import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BookOpen, Download, Play } from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import useResources from '../../../hooks/useResources';
import ResourceModal from './ResourceModal';
import VideoModal from './VideoModal';

const Resources = ({
    user,
    setNotifications,
    isCollapsed,
    setIsCollapsed,
    darkMode,
    setDarkMode,
    notifications = [],
    onActivity,
}) => {
    const navigate = useNavigate();
    const {
        resources,
        subjects,
        selectedSubject,
        setSelectedSubject,
        selectedYear,
        setSelectedYear,
        loading,
        error,
        resetError,
        resourceUrl,
        showResourceModal,
        setShowResourceModal,
        showVideoModal,
        setShowVideoModal,
        resourceLoading,
        currentResource,
        viewResource,
        downloadResource,
    } = useResources();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const displayName = user?.firstName || user?.lastName
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
        : user?.email || 'Student';

    const years = useMemo(
        () => [...new Set(resources.map((resource) => resource.year))].filter(Boolean).sort((a, b) => `${b}`.localeCompare(`${a}`)),
        [resources]
    );

    const filteredResources = useMemo(
        () => resources.filter((resource) => {
            const subjectName = resource.subject?.subjectName || resource.subjectName || '';
            const matchesSubject = !selectedSubject || subjectName === selectedSubject;
            const matchesYear = !selectedYear || resource.year === selectedYear;
            return matchesSubject && matchesYear;
        }),
        [resources, selectedSubject, selectedYear]
    );

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
                    <h1 className="text-4xl font-bold text-foreground">Resources</h1>
                    <p className="mt-2 text-muted-foreground">Access study materials and resources, {displayName}!</p>
                </div>

                <div className="mx-auto max-w-6xl px-8 py-8">
                    <div className="mb-8 rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <h2 className="mb-6 text-2xl font-bold text-foreground">Study Resources</h2>
                        <p className="mb-8 text-sm text-muted-foreground">Explore curated study materials, videos, and interactive resources.</p>

                        {error && (
                            <section className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <span>{error}</span>
                                    <button type="button" onClick={resetError} className="font-semibold underline">
                                        Retry
                                    </button>
                                </div>
                            </section>
                        )}

                        <div className="mb-8 flex flex-col items-end gap-6 md:flex-row">
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-foreground">Filter by Subject</label>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => {
                                        setSelectedSubject(e.target.value);
                                        setSelectedYear('');
                                        onActivity?.('Filtered resources by subject');
                                    }}
                                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-foreground">Filter by Year</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value);
                                        onActivity?.('Filtered resources by year');
                                    }}
                                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredResources.map((resource) => {
                                const subjectName = resource.subject?.subjectName || resource.subjectName || 'N/A';
                                const fileExtension = resource.fileName?.split('.').pop()?.toLowerCase();
                                const isVideo = resource.resourceType === 'file'
                                    && (['mp4', 'webm'].includes(fileExtension) || resource.fileType?.includes('video/'));
                                const isLink = resource.resourceType === 'link';

                                return (
                                    <div key={resource.id} className="rounded-xl border border-border/50 bg-background p-6 transition-shadow hover:shadow-md">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <BookOpen className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-primary">{resource.resourceType || 'Resource'}</p>
                                                    <p className="text-xs text-muted-foreground">{subjectName}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="mb-4 text-lg font-bold text-foreground">{resource.title}</h3>

                                        <div className="mb-4 space-y-1 text-sm text-muted-foreground">
                                            <p>{resource.description || 'No description available'}</p>
                                            {resource.fileName && <p>File: {resource.fileName}</p>}
                                            {resource.url && isLink && <p>Link: {resource.url}</p>}
                                        </div>

                                        <div className="flex gap-2">
                                            {isLink ? (
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 rounded-lg bg-muted py-2 text-center text-sm font-medium text-foreground transition hover:bg-muted/80"
                                                >
                                                    View Link
                                                </a>
                                            ) : (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => viewResource(resource)}
                                                        disabled={resourceLoading}
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted py-2 text-sm font-medium text-foreground transition hover:bg-muted/80 disabled:opacity-50"
                                                    >
                                                        <Play className="h-4 w-4" />
                                                        Preview
                                                    </button>

                                                    {!isVideo && (
                                                        <button
                                                            type="button"
                                                            onClick={() => downloadResource(resource)}
                                                            disabled={resourceLoading}
                                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                            Download
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredResources.length === 0 && (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">No resources found for the selected filters.</p>
                            </div>
                        )}

                        <ResourceModal
                            showModal={showResourceModal}
                            onClose={() => setShowResourceModal(false)}
                            resourceUrl={resourceUrl}
                            currentResource={currentResource}
                            resourceLoading={resourceLoading}
                            onDownloadResource={downloadResource}
                        />
                        <VideoModal
                            showModal={showVideoModal}
                            onClose={() => setShowVideoModal(false)}
                            resourceUrl={resourceUrl}
                            currentResource={currentResource}
                            resourceLoading={resourceLoading}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

Resources.propTypes = {
    user: PropTypes.object.isRequired,
    setNotifications: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    onActivity: PropTypes.func,
};

Resources.defaultProps = {
    onActivity: undefined,
};

export default Resources;
