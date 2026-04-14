import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import ConfirmationModal from '../../common/ConfirmationModal';

const SubjectCard = ({ subject, onRemove }) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <>
            <div className="rounded-xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)] p-6">
                <div className="mb-4 flex items-start justify-between">
                    <h4 className="text-lg font-bold text-[var(--text-primary)]">{subject}</h4>
                    <button
                        type="button"
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="flex-shrink-0 rounded-full bg-red-100 p-1.5 text-red-600 transition hover:bg-red-200"
                        aria-label={`Remove ${subject}`}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <Link
                    to={`/question-papers?subject=${encodeURIComponent(subject)}`}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-90"
                >
                    Past Papers
                </Link>
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={() => {
                    onRemove(subject);
                    setIsDeleteModalOpen(false);
                }}
                title="Confirm Subject Deletion"
                message={`Are you sure you want to delete the ${subject} subject? This action cannot be undone.`}
            />
        </>
    );
};

SubjectCard.propTypes = {
    subject: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default SubjectCard;
