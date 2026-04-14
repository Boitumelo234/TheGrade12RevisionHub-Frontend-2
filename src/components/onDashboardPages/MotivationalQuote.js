import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';

const MotivationalQuote = () => {
    const quotes = [
        { text: 'Education is the most powerful weapon you can use to change the world.', author: 'Nelson Mandela' },
        { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
        { text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', author: 'Winston Churchill' },
        { text: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis' },
        { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
        { text: 'It always seems impossible until it\'s done.', author: 'Nelson Mandela' },
        { text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt' },
        { text: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' },
        { text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
        { text: 'Your time is limited, don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
        { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
        { text: 'What you do today can improve all your tomorrows.', author: 'Ralph Marston' },
        { text: 'Give yourself a task', author: 'Shupe Mphofela' },
        { text: 'Perfection is not attainable, but if we chase perfection we might as well catch excellence.', author: 'Vince Lombardi' },
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const storedDate = localStorage.getItem('quoteDate');
        const storedIndex = localStorage.getItem('quoteIndex');

        if (storedDate === today && storedIndex !== null) {
            setCurrentQuoteIndex(parseInt(storedIndex, 10));
        } else {
            const date = new Date();
            const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
            const newIndex = dayOfYear % quotes.length;
            localStorage.setItem('quoteIndex', newIndex);
            localStorage.setItem('quoteDate', today);
            setCurrentQuoteIndex(newIndex);
        }
    }, [quotes.length]);

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="rounded-2xl border border-[color:rgba(237,237,238,0.9)] bg-[var(--bg-secondary)] p-6 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
                <Quote className="h-5 w-5 text-[var(--accent-primary)]" />
                <span className="font-semibold text-[var(--accent-primary)]">Daily Quote</span>
            </div>
            <p className="mb-6 text-xs text-[var(--text-secondary)]">{currentDate}</p>

            <div className="py-4 text-center">
                <p className="text-lg font-medium italic leading-relaxed text-[var(--text-primary)]">"{quotes[currentQuoteIndex].text}"</p>
                <p className="mt-4 text-sm text-[var(--text-secondary)]">{'\u2014'} {quotes[currentQuoteIndex].author}</p>
            </div>
        </div>
    );
};

export default MotivationalQuote;
