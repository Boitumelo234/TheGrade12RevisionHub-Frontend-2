import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Bell, Moon, Sun } from 'lucide-react';

const Header = ({ user, notifications, darkMode, setDarkMode, tabDescription, userMessage }) => {
    const safeNotifications = Array.isArray(notifications) ? notifications : [];
    const safeUser = user || {};
    const notificationCount = safeNotifications.filter((notification) => !notification.read).length;
    const displayName = safeUser.firstName || safeUser.lastName
        ? `${safeUser.firstName || ''} ${safeUser.lastName || ''}`.trim()
        : safeUser.email || 'User';
    const title = tabDescription || 'Student Dashboard';
    const subtitle = userMessage ? `${userMessage}, ${displayName}!` : `Welcome, ${displayName}!`;
    const toggleTheme = typeof setDarkMode === 'function' ? () => setDarkMode(!darkMode) : undefined;

    return (
        <header className="mb-8 flex items-center justify-between pl-12 lg:pl-0">
            <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)] lg:text-3xl">{title}</h1>
                <p className="mt-1 text-[var(--text-secondary)]">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
                <Link to="/notifications" className="relative rounded-xl p-2" aria-label={`View notifications (${notificationCount} unread)`}>
                    <Bell className="h-5 w-5 text-[var(--text-primary)]" />
                    {notificationCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                            {notificationCount}
                        </span>
                    )}
                </Link>
                <button
                    type="button"
                    onClick={toggleTheme}
                    className="hidden items-center gap-2 rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] sm:flex"
                    aria-label="Toggle dark mode"
                    disabled={!toggleTheme}
                >
                    {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-slate-600" />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }),
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ),
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    tabDescription: PropTypes.string,
    userMessage: PropTypes.string,
};

Header.defaultProps = {
    user: null,
    notifications: [],
    darkMode: false,
    setDarkMode: undefined,
    tabDescription: 'Student Dashboard',
    userMessage: 'Welcome',
};

export default Header;
