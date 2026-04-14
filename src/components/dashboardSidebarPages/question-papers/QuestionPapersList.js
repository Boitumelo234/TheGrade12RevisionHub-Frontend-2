import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Download, Eye } from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import PDFModal from './PDFModal';
import { useQuestionPapers } from '../../../hooks/useQuestionPapers';

const QuestionPaperList = ({
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
        questionPapers,
        subjects,
        selectedSubject,
        setSelectedSubject,
        selectedYear,
        setSelectedYear,
        loading,
        error,
        resetError,
        pdfUrl,
        showModal,
        setShowModal,
        pdfLoading,
        currentPaper,
        viewPdf,
        downloadPdf,
    } = useQuestionPapers();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const years = useMemo(
        () => [...new Set(questionPapers.map((paper) => paper.year))].sort((a, b) => `${b}`.localeCompare(`${a}`)),
        [questionPapers]
    );

    const filteredPapers = useMemo(
        () => questionPapers.filter((paper) => {
            const matchesSubject = !selectedSubject || paper.subject === selectedSubject;
            const matchesYear = !selectedYear || paper.year === selectedYear;
            return matchesSubject && matchesYear;
        }),
        [questionPapers, selectedSubject, selectedYear]
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
            />

            <main className="flex-1 overflow-auto">
                <div className="border-b border-border/50 bg-card px-8 py-8">
                    <h1 className="text-4xl font-bold text-foreground">Explore Past Papers</h1>
                    <p className="mt-2 text-muted-foreground">Filter by subject and year to find exam papers and boost your prep!</p>
                </div>

                <div className="mx-auto max-w-6xl px-8 py-8">
                    <div className="mb-8 rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                        <div className="mb-8 rounded-xl border border-border/50 bg-muted/40 p-4">
                            <p className="text-sm text-foreground">
                                <span className="font-semibold">NB:</span> Past papers can improve your score by up to 20%.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="mb-4 font-bold text-foreground">Quick Tips</h3>
                            <ul className="space-y-3 text-sm text-muted-foreground">
                                <li>&bull; Filter by subject and year to narrow down papers.</li>
                                <li>&bull; Preview papers using the <span className="font-semibold text-foreground">View</span> button.</li>
                                <li>&bull; Save papers offline with the <span className="font-semibold text-foreground">Download</span> button.</li>
                                <li>&bull; Check paper details for more information.</li>
                            </ul>
                        </div>

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
                                    }}
                                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="">Select a subject</option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-semibold text-foreground">Filter by Year</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    <option value="">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {filteredPapers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border/50">
                                            <th className="px-6 py-4 text-left font-semibold text-foreground">Subject</th>
                                            <th className="px-6 py-4 text-left font-semibold text-foreground">Paper Title</th>
                                            <th className="px-6 py-4 text-left font-semibold text-foreground">Year</th>
                                            <th className="px-6 py-4 text-right font-semibold text-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPapers.map((paper) => (
                                            <tr key={paper.id} className="border-b border-border/50 transition-colors hover:bg-muted/30">
                                                <td className="px-6 py-4 font-medium text-foreground">{paper.subject}</td>
                                                <td className="px-6 py-4 text-foreground">{paper.title}</td>
                                                <td className="px-6 py-4 text-muted-foreground">{paper.year}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                onActivity(`Viewed past paper: ${paper.title}`);
                                                                viewPdf(paper.id);
                                                            }}
                                                            disabled={pdfLoading}
                                                            className="flex items-center gap-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted/80 disabled:opacity-50"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            {pdfLoading ? 'Loading' : 'View'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                onActivity(`Downloaded past paper: ${paper.title}`);
                                                                downloadPdf(paper.id, paper.title);
                                                            }}
                                                            disabled={pdfLoading}
                                                            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                                                        >
                                                            <Download className="h-3 w-3" />
                                                            {pdfLoading ? 'Loading' : 'Download'}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <p className="text-muted-foreground">
                                    {selectedSubject ? 'No papers found for the selected filters.' : 'Select a subject to view papers.'}
                                </p>
                            </div>
                        )}

                        <PDFModal
                            showModal={showModal}
                            onClose={() => setShowModal(false)}
                            pdfUrl={pdfUrl}
                            currentPaper={currentPaper}
                            pdfLoading={pdfLoading}
                            onDownloadPdf={downloadPdf}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

QuestionPaperList.propTypes = {
    user: PropTypes.object.isRequired,
    setNotifications: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default QuestionPaperList;
