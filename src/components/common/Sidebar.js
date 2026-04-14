import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    LayoutDashboard,
    BookOpen,
    HelpCircle,
    FileText,
    Link2,
    BarChart3,
    Bell,
    MessageCircle,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

const Sidebar = ({ user, onLogout, isCollapsed, setIsCollapsed, onActivity }) => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const displayName = useMemo(() => {
        if (user?.firstName || user?.lastName) {
            return `${user.firstName || ''} ${user.lastName || ''}`.trim();
        }
        return user?.email || 'User';
    }, [user]);

    const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'MM';

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', color: 'text-emerald-600' },
        { icon: BookOpen, label: 'Subjects', href: '/subjects', color: 'text-blue-600' },
        { icon: HelpCircle, label: 'Quizzes', href: '/quizzes', color: 'text-orange-600' },
        { icon: FileText, label: 'Question Papers', href: '/question-papers/list', color: 'text-rose-600' },
        { icon: Link2, label: 'Resources', href: '/resources', color: 'text-purple-600', onClick: () => onActivity?.('Viewed Resources') },
        { icon: BarChart3, label: 'Performance', href: '/performance', color: 'text-cyan-600', onClick: () => onActivity?.('Viewed Performances') },
        { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-yellow-600' },
        { icon: MessageCircle, label: 'Chatroom', href: '/chatroom', color: 'text-pink-600', onClick: () => onActivity?.('Visited Chatroom') },
        { icon: Settings, label: 'Settings', href: '/settings', color: 'text-indigo-600' },
        { icon: LogOut, label: 'Logout', href: '/', color: 'text-red-600', onClick: onLogout },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity ${
                    mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setMobileOpen(false)}
            />

            <aside
                className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } ${isCollapsed ? 'lg:w-20 lg:translate-x-0' : 'w-64'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <div className={`flex items-center gap-2 ${isCollapsed ? 'lg:justify-center lg:w-full' : ''}`}>
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">R</span>
                        </div>
                        <span className={`font-semibold text-foreground ${isCollapsed ? 'lg:hidden' : ''}`}>
                            RevisionHub
                        </span>
                    </div>

                    <button
                        type="button"
                        className="lg:hidden inline-flex items-center justify-center"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        className="hidden lg:inline-flex items-center justify-center"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => {
                                    if (item.onClick) item.onClick();
                                    setMobileOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                    isActive
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                } ${isCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                                <span className={`${isCollapsed ? 'lg:hidden' : ''} text-foreground`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className={`p-4 border-t border-border ${isCollapsed ? 'lg:p-2' : ''}`}>
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'lg:justify-center' : ''}`}>
                        <div className="w-10 h-10 rounded-full border-2 border-primary/20 bg-primary/10 text-primary font-medium flex items-center justify-center">
                            {initials}
                        </div>
                        <div className={`flex-1 min-w-0 ${isCollapsed ? 'lg:hidden' : ''}`}>
                            <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            <p className="text-xs text-primary">{user?.title || 'Grade 12 Learner'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            <button
                type="button"
                className="fixed top-4 left-4 z-30 lg:hidden bg-card border border-border rounded-xl p-2"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
            >
                <Menu className="w-5 h-5" />
            </button>
        </>
    );
};

Sidebar.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
    }),
    onLogout: PropTypes.func,
    isCollapsed: PropTypes.bool,
    setIsCollapsed: PropTypes.func,
    onActivity: PropTypes.func,
};

Sidebar.defaultProps = {
    user: {},
    onLogout: () => {},
    isCollapsed: false,
    setIsCollapsed: () => {},
    onActivity: undefined,
};

export default Sidebar;
