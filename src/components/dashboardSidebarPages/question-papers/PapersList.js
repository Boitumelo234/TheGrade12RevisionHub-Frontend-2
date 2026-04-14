import React from 'react';
import PropTypes from 'prop-types';
import { Download, Eye } from 'lucide-react';

const PapersList = ({ papers, selectedSubject, selectedYear, pdfLoading, onViewPdf, onDownloadPdf, onActivity }) => {
    const filteredPapers = papers.filter((paper) => {
        const matchesSubject = !selectedSubject || paper.subject === selectedSubject;
        const matchesYear = !selectedYear || paper.year === selectedYear;
        return matchesSubject && matchesYear;
    });

    if (filteredPapers.length === 0) {
        return (
            <div className="py-12 text-center text-[var(--text-secondary)]">
                {selectedSubject
                    ? `No papers for ${selectedSubject}${selectedYear ? ` (${selectedYear})` : ''}.`
                    : 'Select a subject to view papers.'}
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-[rgba(229,231,235,0.5)]">
                        <th className="px-6 py-4 text-left font-semibold text-[var(--text-primary)]">Subject</th>
                        <th className="px-6 py-4 text-left font-semibold text-[var(--text-primary)]">Paper Title</th>
                        <th className="px-6 py-4 text-left font-semibold text-[var(--text-primary)]">Year</th>
                        <th className="px-6 py-4 text-left font-semibold text-[var(--text-primary)]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPapers.map((paper) => (
                        <tr key={paper.id} className="border-b border-[rgba(229,231,235,0.5)]">
                            <td className="px-6 py-4 text-[var(--text-primary)]">{paper.subject}</td>
                            <td className="px-6 py-4 text-[var(--text-primary)]">{paper.title}</td>
                            <td className="px-6 py-4 text-[var(--text-secondary)]">{paper.year}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onActivity(`Viewed past paper: ${paper.title}`);
                                            onViewPdf(paper.id);
                                        }}
                                        disabled={pdfLoading}
                                        className="inline-flex items-center gap-1 rounded-lg bg-[var(--bg-tertiary)] px-3 py-2 text-xs font-medium text-[var(--text-primary)] transition hover:opacity-90 disabled:opacity-50"
                                    >
                                        <Eye className="h-3 w-3" />
                                        <span>{pdfLoading ? 'Loading' : 'View'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onActivity(`Downloaded past paper: ${paper.title}`);
                                            onDownloadPdf(paper.id, paper.title);
                                        }}
                                        disabled={pdfLoading}
                                        className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent-primary)] px-3 py-2 text-xs font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                                    >
                                        <Download className="h-3 w-3" />
                                        <span>{pdfLoading ? 'Loading' : 'Download'}</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

PapersList.propTypes = {
    papers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            subject: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedSubject: PropTypes.string.isRequired,
    selectedYear: PropTypes.string.isRequired,
    pdfLoading: PropTypes.bool.isRequired,
    onViewPdf: PropTypes.func.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default PapersList;
