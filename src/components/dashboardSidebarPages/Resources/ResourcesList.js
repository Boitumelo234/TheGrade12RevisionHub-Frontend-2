import React from 'react';
import PropTypes from 'prop-types';
import { BookOpen, Download, Play } from 'lucide-react';

const ResourcesList = ({ resources, selectedSubject, selectedYear, resourceLoading, onViewResource, onDownloadResource }) => {
    const filteredResources = resources.filter((resource) => {
        const matchesSubject = !selectedSubject || resource.subject?.subjectName === selectedSubject;
        const matchesYear = !selectedYear || resource.year === selectedYear;
        return matchesSubject && matchesYear;
    });

    if (filteredResources.length === 0) {
        return (
            <div className="py-12 text-center text-[var(--text-secondary)]">
                No resources found{selectedSubject ? ` for ${selectedSubject}` : ''}{selectedYear ? ` in ${selectedYear}` : ''}.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => {
                const fileExtension = resource.fileName?.split('.').pop()?.toLowerCase();
                const isVideo = resource.resourceType === 'file' &&
                    (['mp4', 'webm'].includes(fileExtension) || resource.fileType?.includes('video/'));
                const isLink = resource.resourceType === 'link';

                return (
                    <div key={resource.id} className="rounded-xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)] p-6 transition hover:shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(34,197,94,0.12)]">
                                    <BookOpen className="h-5 w-5 text-[var(--accent-primary)]" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-[var(--accent-primary)]">{resource.resourceType || 'Resource'}</p>
                                    <p className="text-xs text-[var(--text-secondary)]">{resource.subject?.subjectName || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        <h3 className="mb-4 text-lg font-bold text-[var(--text-primary)]">{resource.title}</h3>

                        <div className="mb-4 space-y-1 text-sm text-[var(--text-secondary)]">
                            <p>{resource.description || 'No description available'}</p>
                            {resource.fileName && <p>File: {resource.fileName}</p>}
                            {resource.url && <p>Link: {resource.url}</p>}
                        </div>

                        <div className="flex gap-2">
                            {isLink ? (
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 rounded-lg bg-[var(--bg-tertiary)] py-2 text-center text-sm font-medium text-[var(--text-primary)] transition hover:opacity-90"
                                >
                                    View Link
                                </a>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => onViewResource(resource)}
                                        disabled={resourceLoading}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--bg-tertiary)] py-2 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-90 disabled:opacity-50"
                                    >
                                        <Play className="h-4 w-4" />
                                        <span>Preview</span>
                                    </button>
                                    {!isVideo && (
                                        <button
                                            type="button"
                                            onClick={() => onDownloadResource(resource)}
                                            disabled={resourceLoading}
                                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span>Download</span>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

ResourcesList.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            subject: PropTypes.shape({
                subjectName: PropTypes.string,
            }),
            year: PropTypes.string,
            resourceType: PropTypes.string,
            fileName: PropTypes.string,
            fileType: PropTypes.string,
            url: PropTypes.string,
        })
    ).isRequired,
    selectedSubject: PropTypes.string,
    selectedYear: PropTypes.string,
    resourceLoading: PropTypes.bool.isRequired,
    onViewResource: PropTypes.func.isRequired,
    onDownloadResource: PropTypes.func.isRequired,
};

ResourcesList.defaultProps = {
    selectedSubject: '',
    selectedYear: '',
};

export default ResourcesList;
