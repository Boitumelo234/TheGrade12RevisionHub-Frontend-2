import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Eye } from 'lucide-react';

const CourseMastery = ({ enrolledSubjects, courses }) => {
    const subjects = useMemo(() => (
        [...courses]
            .filter((course) => enrolledSubjects.includes(course.name))
            .sort((a, b) => b.progress - a.progress)
    ), [courses, enrolledSubjects]);

    const getSubjectIcon = (name) => {
        const key = name.toLowerCase();
        if (key.includes('math')) return '\uD83D\uDCD0';
        if (key.includes('physical') || key.includes('science')) return '\uD83D\uDD2C';
        if (key.includes('english')) return '\uD83D\uDCDA';
        if (key.includes('life')) return '\uD83E\uDDEC';
        return '\uD83D\uDCD8';
    };

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
                <Eye className="h-5 w-5 text-[var(--text-secondary)]" />
                <span className="font-semibold text-[var(--text-primary)]">Subject Progress</span>
            </div>
            <p className="mb-6 text-sm text-[var(--text-secondary)]">Track your mastery in each subject</p>

            <div className="space-y-4">
                {subjects.length > 0 ? subjects.map((subject) => (
                    <div key={subject.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{getSubjectIcon(subject.name)}</span>
                                <span className="text-sm font-medium text-[var(--text-primary)]">{subject.name}</span>
                            </div>
                            <span className="text-sm font-semibold text-[var(--accent-primary)]">{Math.round(subject.progress)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-[color:rgba(243,244,246,1)]">
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${Math.round(subject.progress)}%`,
                                    background: 'linear-gradient(90deg, var(--accent-primary), rgba(22,163,74,0.7))',
                                }}
                            />
                        </div>
                    </div>
                )) : (
                    <div className="rounded-xl bg-[color:rgba(243,244,246,0.7)] p-6 text-center">
                        <p className="text-sm text-[var(--text-secondary)]">No activity completed yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

CourseMastery.propTypes = {
    enrolledSubjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CourseMastery;
