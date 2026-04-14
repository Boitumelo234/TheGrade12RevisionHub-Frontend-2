import React from 'react';
import PropTypes from 'prop-types';
import { Heart } from 'lucide-react';

const ProgressOverview = ({ courses }) => {
    const score = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length || 0);
    const status = score >= 80 ? 'Looking good!' : score >= 50 ? 'Good' : 'Needs work';
    const label = score >= 80 ? 'Healthy+' : score >= 50 ? 'Good' : 'Needs Work';
    const size = 130;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (Math.min(score, 100) / 100) * circumference;

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="mb-4 flex items-center gap-2">
                        <Heart className="h-5 w-5 fill-[var(--accent-primary)] text-[var(--accent-primary)]" />
                        <span className="font-semibold text-[var(--accent-primary)]">Study Health</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">{status}</h3>
                    <p className="mb-4 text-sm text-[var(--text-secondary)]">
                        Healthy momentum: your study sessions are trending in the right direction.
                    </p>
                    <button className="rounded-xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]">
                        View Details
                    </button>
                </div>

                <div className="relative inline-flex items-center justify-center">
                    <svg width={size} height={size} className="-rotate-90">
                        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(243,244,246,1)" strokeWidth={strokeWidth} />
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="url(#healthGradient)"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                        />
                        <defs>
                            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(145, 80%, 45%)" />
                                <stop offset="100%" stopColor="hsl(145, 70%, 55%)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-[var(--text-primary)]">{score}</span>
                        <span className="text-xs font-medium text-[var(--accent-primary)]">{label}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProgressOverview.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ProgressOverview;
