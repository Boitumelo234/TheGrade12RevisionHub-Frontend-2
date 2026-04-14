import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';

const StudyTimer = ({ onTimerFinish }) => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [customTime, setCustomTime] = useState('');

    useEffect(() => {
        let interval;
        if (isActive && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        } else if (time <= 0 && isActive) {
            setIsActive(false);
            onTimerFinish();
        }
        return () => clearInterval(interval);
    }, [isActive, time, onTimerFinish]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSetTime = () => {
        const minutes = parseInt(customTime, 10);
        if (!isNaN(minutes) && minutes > 0) {
            setTime(minutes * 60);
            setCustomTime('');
            setIsActive(false);
        }
    };

    const handleReset = () => {
        setTime(0);
        setIsActive(false);
    };

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
                <Timer className="h-5 w-5 text-[var(--accent-secondary)]" />
                <span className="font-semibold text-[var(--text-primary)]">Study Timer</span>
            </div>

            <div className="mb-6 text-center">
                <span className="font-mono text-5xl font-bold text-[var(--accent-primary)]">{formatTime()}</span>
            </div>

            <div className="mb-6 flex justify-center gap-2">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="inline-flex items-center rounded-xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? (
                        <>
                            <Pause className="mr-1 h-4 w-4" /> Pause
                        </>
                    ) : (
                        <>
                            <Play className="mr-1 h-4 w-4" /> Start
                        </>
                    )}
                </button>
                <button
                    onClick={handleReset}
                    className="inline-flex items-center rounded-xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                    aria-label="Reset timer"
                >
                    <RotateCcw className="mr-1 h-4 w-4" /> Reset
                </button>
            </div>

            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Set minutes"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="flex-1 rounded-xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none"
                    aria-label="Set custom timer duration in minutes"
                />
                <button
                    onClick={handleSetTime}
                    className="rounded-xl bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                    aria-label="Set timer"
                >
                    Set
                </button>
            </div>
        </div>
    );
};

StudyTimer.propTypes = {
    onTimerFinish: PropTypes.func.isRequired,
};

export default StudyTimer;
