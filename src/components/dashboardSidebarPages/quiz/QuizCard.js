import React from 'react';
import PropTypes from 'prop-types';

const QuizCard = ({ quiz, onStartQuiz }) => {
    const handleClick = () => {
        if (!quiz.id) return;
        onStartQuiz(quiz.id, quiz.title);
    };

    return (
        <div className="flex items-center justify-between rounded-xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)] p-5 transition hover:shadow-sm">
            <div>
                <p className="mb-1 text-xs font-semibold text-[var(--accent-primary)]">{quiz.subject || 'Unknown Subject'}</p>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{quiz.title || 'Untitled Quiz'}</h3>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'No due date'}
                </p>
            </div>
            <button
                type="button"
                onClick={handleClick}
                disabled={!quiz.id}
                className="rounded-lg bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Start Quiz
            </button>
        </div>
    );
};

QuizCard.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        subject: PropTypes.string,
        dueDate: PropTypes.string,
    }).isRequired,
    onStartQuiz: PropTypes.func.isRequired,
};

export default QuizCard;
