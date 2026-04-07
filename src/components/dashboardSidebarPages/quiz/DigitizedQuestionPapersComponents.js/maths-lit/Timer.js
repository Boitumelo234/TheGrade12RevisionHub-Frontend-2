import React from 'react'
import { useTimer } from './TimerContext'

const Timer = () => {
    const { timeLeft, isTimeUp, formatTime } = useTimer()

    const getTimerColor = () => {
        if (timeLeft <= 300) return 'timer-critical' // 5 minutes or less
        if (timeLeft <= 900) return 'timer-warning' // 15 minutes or less
        return 'timer-normal'
    }

    const getTimerMessage = () => {
        if (isTimeUp) return "Time's up! Paper submitted automatically."
        if (timeLeft <= 300) return "Hurry up! Only 5 minutes left!"
        if (timeLeft <= 900) return "Warning: 15 minutes remaining!"
        return "Time remaining"
    }

    return (
        <div className={`timer-container ${getTimerColor()}`}>
            <div className="timer-display">
                <div className="timer-label">{getTimerMessage()}</div>
                <div className="timer-time">{formatTime(timeLeft)}</div>
            </div>
            {isTimeUp && (
                <div className="time-up-overlay">
                    <div className="time-up-message">
                        <h2>⏰ Time's Up!</h2>
                        <p>Your paper has been automatically submitted.</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Timer