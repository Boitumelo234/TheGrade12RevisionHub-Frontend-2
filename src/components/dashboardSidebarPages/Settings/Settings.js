import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Upload, Save, Trash2, Eye, EyeOff, Sun, Moon } from 'lucide-react';
import Sidebar from '../../common/Sidebar';

const Settings = ({
    user,
    setUser,
    isCollapsed,
    setIsCollapsed,
    darkMode,
    setDarkMode,
    notifications,
    setNotifications,
    onActivity,
}) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previewImage, setPreviewImage] = useState(user?.profilePicture || null);
    const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        chatNotifications: true,
        notificationSound: true,
        fontSize: localStorage.getItem('fontSize') || 'medium',
        theme: darkMode ? 'dark' : 'light',
    });
    const [initialSettings, setInitialSettings] = useState({
        emailNotifications: true,
        chatNotifications: true,
        notificationSound: true,
        fontSize: localStorage.getItem('fontSize') || 'medium',
        theme: darkMode ? 'dark' : 'light',
    });

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        document.documentElement.style.fontSize =
            settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px';
        localStorage.setItem('fontSize', settings.fontSize);
    }, [settings.fontSize]);

    useEffect(() => {
        setPreviewImage(user?.profilePicture || null);
    }, [user?.profilePicture]);

    const displayName = useMemo(() => {
        if (user?.firstName || user?.lastName) {
            return `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
        }
        return user?.email || 'Student';
    }, [user]);

    const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase() || 'MM';

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'appearance', label: 'Appearance' },
    ];

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        if (key === 'theme') {
            setDarkMode(value === 'dark');
        }
    };

    const handleProfileFieldChange = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);

        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            const formData = new FormData();
            formData.append('profilePicture', file);
            const response = await fetch('http://localhost:6262/api/user/profile/update-picture', {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.message || 'Failed to update profile picture.');
            setUser((prev) => ({ ...prev, profilePicture: result.data.profilePicture }));
            setSuccess('Profile picture updated successfully.');
            onActivity?.('Updated profile picture');
        } catch (err) {
            setError(err.message || 'Failed to update profile picture.');
        } finally {
            setLoading(false);
        }
    };

    const saveProfile = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/user/profile/update-profile', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                }),
            });
            const result = await response.json();
            if (!response.ok || !result.success) throw new Error(result.message || 'Failed to update profile.');
            setUser((prev) => ({
                ...prev,
                firstName: result.data.firstName,
                lastName: result.data.lastName,
                phoneNumber: result.data.phoneNumber,
            }));
            setSuccess('Profile saved successfully.');
            onActivity?.('Updated profile information');
        } catch (err) {
            setError(err.message || 'Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (!confirmed) return;
        setLoading(true);
        setError('');
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/user/profile/delete-account', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            sessionStorage.removeItem('jwt');
            navigate('/');
        } catch (err) {
            setError(`Failed to delete account: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/users/profile/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: password.currentPassword.trim(),
                    newPassword: password.newPassword.trim(),
                }),
            });
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Failed to change password: HTTP ${response.status}`;
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                }
                throw new Error(errorMessage);
            }
            setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setSuccess('Password changed successfully.');
            onActivity?.('Changed password');
        } catch (err) {
            setError(err.message || 'An error occurred while changing password.');
        } finally {
            setLoading(false);
        }
    };

    const hasSettingsChanged = () =>
        settings.emailNotifications !== initialSettings.emailNotifications ||
        settings.chatNotifications !== initialSettings.chatNotifications ||
        settings.notificationSound !== initialSettings.notificationSound ||
        settings.fontSize !== initialSettings.fontSize ||
        settings.theme !== initialSettings.theme;

    const handleSaveSettings = async () => {
        if (!hasSettingsChanged()) return;
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/users/settings`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.email,
                    emailNotifications: settings.emailNotifications,
                    chatNotifications: settings.chatNotifications,
                    notificationSound: settings.notificationSound,
                    fontSize: settings.fontSize,
                    theme: settings.theme,
                    pushNotifications: false,
                    mentionNotifications: true,
                    language: 'en',
                    profileVisibility: 'public',
                    dataSharing: false,
                }),
            });
            if (!response.ok) throw new Error(`Failed to save settings: HTTP ${response.status}`);
            const data = await response.json();
            setInitialSettings(settings);
            setSuccess(data.message || 'Settings saved successfully');
            onActivity?.('Saved settings');
        } catch (err) {
            setError(err.message || 'An error occurred while saving settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleClearNotifications = async () => {
        if (!notifications?.length || !user?.id) return;
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`${API_BASE_URL}/users/notifications/${user.id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`Failed to clear notifications: HTTP ${response.status}`);
            setNotifications([]);
            setSuccess('Notifications cleared successfully.');
            onActivity?.('Cleared notifications');
        } catch (err) {
            setError(err.message || 'An error occurred while clearing notifications.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--accent-primary)]" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onActivity={onActivity}
            />
            <main className={`flex-1 overflow-auto ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <div className="border-b border-border/50 bg-card px-8 py-8">
                    <h1 className="text-4xl font-bold text-foreground">Settings</h1>
                    <p className="text-muted-foreground mt-2">Manage your account and preferences, {displayName}!</p>
                </div>

                <div className="max-w-4xl mx-auto px-8 py-8">
                    {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                    {success && <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

                    <div className="flex gap-8 border-b border-border/50 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 font-medium transition-colors ${
                                    activeTab === tab.id
                                        ? 'text-foreground border-b-2 border-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'profile' && (
                        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                            <h2 className="text-2xl font-bold text-foreground mb-8">Profile Information</h2>

                            <div className="flex items-start gap-6 mb-10">
                                <div className="flex flex-col items-center">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-blue-300 mb-4" />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-blue-500 border-2 border-blue-300 flex items-center justify-center text-white text-2xl font-bold mb-4">
                                            {initials}
                                        </div>
                                    )}
                                    <label className="bg-muted text-foreground hover:bg-muted/80 rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 cursor-pointer">
                                        <Upload className="w-4 h-4" />
                                        Choose File
                                        <input type="file" accept=".jpg,.jpeg,.png,.gif" onChange={handleProfilePictureChange} className="hidden" />
                                    </label>
                                    <p className="text-xs text-muted-foreground mt-2">No file chosen</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">First Name</label>
                                    <input type="text" name="firstName" value={user.firstName || ''} onChange={handleProfileFieldChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Last Name</label>
                                    <input type="text" name="lastName" value={user.lastName || ''} onChange={handleProfileFieldChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={user.phoneNumber || ''} onChange={handleProfileFieldChange} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                                    <input type="email" name="email" value={user.email || ''} disabled className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none" />
                                </div>
                            </div>

                            <button onClick={saveProfile} className="bg-muted text-foreground hover:bg-muted/80 rounded-lg px-6 py-3 font-medium flex items-center gap-2 mb-12" disabled={loading}>
                                <Save className="w-4 h-4" />
                                Save Profile
                            </button>

                            <div className="border-t border-border/50 pt-8">
                                <h3 className="text-xl font-bold text-foreground mb-2">Delete Account</h3>
                                <p className="text-sm text-muted-foreground mb-6">Permanently delete your account and data</p>
                                <button onClick={handleDeleteAccount} className="bg-red-500 text-white hover:bg-red-600 rounded-lg px-6 py-3 font-medium flex items-center gap-2" disabled={loading}>
                                    <Trash2 className="w-4 h-4" />
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                            <h2 className="text-2xl font-bold text-foreground">Security Settings</h2>
                            <p className="text-muted-foreground mt-2 mb-6">Manage your password and security preferences.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 relative">
                                    <label className="block text-sm font-semibold text-foreground mb-2">Current Password</label>
                                    <input type={showCurrentPassword ? 'text' : 'password'} value={password.currentPassword} onChange={(e) => setPassword((prev) => ({ ...prev, currentPassword: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <button type="button" className="absolute right-4 top-[42px]" onClick={() => setShowCurrentPassword((v) => !v)}>{showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
                                    <input type={showNewPassword ? 'text' : 'password'} value={password.newPassword} onChange={(e) => setPassword((prev) => ({ ...prev, newPassword: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <button type="button" className="absolute right-4 top-[42px]" onClick={() => setShowNewPassword((v) => !v)}>{showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                                </div>
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
                                    <input type={showConfirmPassword ? 'text' : 'password'} value={password.confirmPassword} onChange={(e) => setPassword((prev) => ({ ...prev, confirmPassword: e.target.value }))} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <button type="button" className="absolute right-4 top-[42px]" onClick={() => setShowConfirmPassword((v) => !v)}>{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                                </div>
                            </div>
                            <button onClick={handleChangePassword} className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium" disabled={loading}>
                                Change Password
                            </button>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                            <h2 className="text-2xl font-bold text-foreground">Notification Preferences</h2>
                            <p className="text-muted-foreground mt-2 mb-6">Control how you receive notifications.</p>
                            <div className="space-y-4">
                                {[
                                    ['emailNotifications', 'Email notifications'],
                                    ['chatNotifications', 'Chat notifications'],
                                    ['notificationSound', 'Notification sound'],
                                ].map(([key, label]) => (
                                    <div key={key} className="flex items-center justify-between rounded-lg border border-border/50 bg-background px-4 py-4">
                                        <p className="text-sm font-medium text-foreground">{label}</p>
                                        <button
                                            type="button"
                                            onClick={() => handleSettingChange(key, !settings[key])}
                                            className={`relative h-7 w-12 rounded-full ${settings[key] ? 'bg-primary' : 'bg-gray-300'}`}
                                        >
                                            <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${settings[key] ? 'left-6' : 'left-1'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex gap-3">
                                <button onClick={handleSaveSettings} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium" disabled={loading || !hasSettingsChanged()}>
                                    Save Preferences
                                </button>
                                <button onClick={handleClearNotifications} className="bg-muted text-foreground hover:bg-muted/80 rounded-lg px-6 py-3 font-medium" disabled={loading || !notifications?.length}>
                                    Clear Notifications
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border/50">
                            <h2 className="text-2xl font-bold text-foreground">Appearance</h2>
                            <p className="text-muted-foreground mt-2 mb-6">Customize the look and feel of your dashboard.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Theme</label>
                                    <div className="flex gap-3">
                                        <button onClick={() => handleSettingChange('theme', 'light')} className={`rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2 ${settings.theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                                            <Sun className="w-4 h-4" />
                                            Light
                                        </button>
                                        <button onClick={() => handleSettingChange('theme', 'dark')} className={`rounded-lg px-4 py-3 text-sm font-medium flex items-center gap-2 ${settings.theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                                            <Moon className="w-4 h-4" />
                                            Dark
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">Font Size</label>
                                    <select value={settings.fontSize} onChange={(e) => handleSettingChange('fontSize', e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                            </div>
                            <button onClick={handleSaveSettings} className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 font-medium" disabled={loading || !hasSettingsChanged()}>
                                Save Appearance
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

Settings.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phoneNumber: PropTypes.string,
        profilePicture: PropTypes.string,
        title: PropTypes.string,
    }),
    setUser: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.array,
    setNotifications: PropTypes.func.isRequired,
    onActivity: PropTypes.func,
};

Settings.defaultProps = {
    user: null,
    isCollapsed: false,
    darkMode: false,
    notifications: [],
    onActivity: undefined,
};

export default Settings;
