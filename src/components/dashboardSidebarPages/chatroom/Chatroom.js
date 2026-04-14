import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { v4 as uuidv4 } from 'uuid';
import { Eye, Plus, Send, Trash2, Users } from 'lucide-react';
import Sidebar from '../../common/Sidebar';
import GroupUsersModal from './GroupUsersModal';
import ConfirmationModal from './ConfirmationModal';

const Chatroom = ({ user, isCollapsed = true, setIsCollapsed, darkMode, notifications, onActivity }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [privateSearchQuery, setPrivateSearchQuery] = useState('');
    const [createGroupSearchQuery, setCreateGroupSearchQuery] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [chatMode, setChatMode] = useState('group');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const stompClientRef = useRef(null);
    const [editGroupId, setEditGroupId] = useState(null);
    const [editGroupName, setEditGroupName] = useState('');
    const [groupUsers, setGroupUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);

    const isAdmin = useCallback(
        (groupId) => {
            const group = groups.find((item) => item.id === groupId);
            return Boolean(group && user && group.creatorId === user.id);
        },
        [groups, user]
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const formatDate = (dateString, timeZone = 'Africa/Johannesburg') => {
        if (!dateString || typeof dateString !== 'string') return 'Unknown Date';
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return 'Invalid Date';
        return date.toLocaleString('en-US', {
            timeZone,
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const fetchUsers = useCallback(async (query = '') => {
        try {
            const token = sessionStorage.getItem('jwt');
            const url = query.trim()
                ? `http://localhost:6262/api/user/chat/users/search?query=${encodeURIComponent(query)}`
                : 'http://localhost:6262/api/user/chat/users';

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            setUsers(data.map((item) => ({ ...item, id: Number(item.id) })));
        } catch (fetchError) {
            setError(`Failed to fetch users: ${fetchError.message}`);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                fetchUsers(privateSearchQuery);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [privateSearchQuery, user, fetchUsers]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                fetchUsers(createGroupSearchQuery);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [createGroupSearchQuery, user, fetchUsers]);

    useEffect(() => {
        const fetchGroups = async () => {
            if (!user) return;
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await fetch('http://localhost:6262/api/user/chat/groups', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }

                const data = await response.json();
                setGroups(
                    data.map((item) => ({
                        ...item,
                        id: Number(item.id),
                        creatorId: Number(item.creatorId),
                    }))
                );
            } catch (fetchError) {
                setError(`Failed to fetch groups: ${fetchError.message}`);
            }
        };

        fetchGroups();
    }, [user]);

    const fetchGroupUsers = useCallback(async (groupId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${groupId}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            const group = groups.find((item) => item.id === groupId);
            setGroupUsers(
                data.map((item) => ({
                    ...item,
                    id: Number(item.id),
                    isAdmin: group && Number(item.id) === group.creatorId,
                }))
            );
        } catch (fetchError) {
            setError(`Failed to fetch group users: ${fetchError.message}`);
        }
    }, [groups]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const token = sessionStorage.getItem('jwt');
                let url;

                if (chatMode === 'group') {
                    url = selectedGroupId
                        ? `http://localhost:6262/api/user/chat/group/${selectedGroupId}`
                        : 'http://localhost:6262/api/user/chat/group';
                } else if (chatMode === 'private' && selectedUserId) {
                    url = `http://localhost:6262/api/user/chat/private/${selectedUserId}`;
                } else {
                    setMessages([]);
                    setLoading(false);
                    return;
                }

                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }

                const data = await response.json();
                setMessages(
                    data
                        .map((item) => ({
                            ...item,
                            senderId: Number(item.senderId),
                            recipientId: item.recipientId ? Number(item.recipientId) : null,
                            groupId: item.groupId ? Number(item.groupId) : null,
                            timestamp: formatDate(item.createdAt),
                        }))
                        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                );
            } catch (fetchError) {
                setError(`Failed to fetch messages: ${fetchError.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [user, chatMode, selectedUserId, selectedGroupId]);

    const updateMessagesWithServerResponse = useCallback((data) => {
        setMessages((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.tempId && item.content === data.content && item.senderId === Number(data.senderId)
            );

            if (existingIndex !== -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...data,
                    senderId: Number(data.senderId),
                    recipientId: data.recipientId ? Number(data.recipientId) : null,
                    groupId: data.groupId ? Number(data.groupId) : null,
                    timestamp: formatDate(data.createdAt),
                    id: data.id || uuidv4(),
                };
                return updated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }

            if (!prev.some((item) => item.id === data.id)) {
                return [
                    ...prev,
                    {
                        ...data,
                        senderId: Number(data.senderId),
                        recipientId: data.recipientId ? Number(data.recipientId) : null,
                        groupId: data.groupId ? Number(data.groupId) : null,
                        timestamp: formatDate(data.createdAt),
                        id: data.id || uuidv4(),
                    },
                ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }

            return prev;
        });
    }, []);

    const updateGroupUsersWithServerResponse = useCallback((data) => {
        setGroupUsers(
            data.users.map((item) => ({
                ...item,
                id: Number(item.id),
            }))
        );
    }, []);

    useEffect(() => {
        if (!user || stompClientRef.current) return;

        const socket = new SockJS('http://localhost:6262/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                stompClientRef.current = client;
                setStompClient(client);

                client.subscribe('/topic/group', (message) => {
                    if (chatMode === 'group' && !selectedGroupId) {
                        updateMessagesWithServerResponse(JSON.parse(message.body));
                    }
                });

                groups.forEach((group) => {
                    client.subscribe(`/topic/group/${group.id}`, (message) => {
                        if (chatMode === 'group' && selectedGroupId === group.id) {
                            updateMessagesWithServerResponse(JSON.parse(message.body));
                        }
                    });

                    client.subscribe(`/topic/group/${group.id}/users`, (message) => {
                        if (editGroupId === group.id) {
                            updateGroupUsersWithServerResponse(JSON.parse(message.body));
                        }
                    });
                });

                client.subscribe(`/user/${user.id}/queue/message`, (message) => {
                    if (chatMode === 'private' && selectedUserId) {
                        const data = JSON.parse(message.body);
                        if (
                            (data.senderId === user.id && data.recipientId === Number(selectedUserId)) ||
                            (data.senderId === Number(selectedUserId) && data.recipientId === user.id)
                        ) {
                            updateMessagesWithServerResponse(data);
                        }
                    }
                });
            },
            onStompError: (frame) => {
                setError(`WebSocket connection failed: ${frame.body || frame}`);
            },
            onWebSocketClose: () => {
                stompClientRef.current = null;
                setStompClient(null);
            },
        });

        client.activate();

        return () => {
            if (stompClientRef.current) {
                client.deactivate();
                stompClientRef.current = null;
            }
        };
    }, [user, groups, chatMode, selectedUserId, selectedGroupId, editGroupId, updateMessagesWithServerResponse, updateGroupUsersWithServerResponse]);

    const handleAddUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: Number(userId) }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const userToAdd = users.find((item) => item.id === Number(userId));
            if (userToAdd) {
                const group = groups.find((item) => item.id === editGroupId);
                setGroupUsers((prev) => [
                    ...prev,
                    {
                        ...userToAdd,
                        isAdmin: group && Number(userToAdd.id) === group.creatorId,
                    },
                ]);
            }
            setError(null);
        } catch (fetchError) {
            setError(`Failed to add user: ${fetchError.message}`);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            setGroupUsers((prev) => prev.filter((item) => item.id !== userId));
            setError(null);
        } catch (fetchError) {
            setError(`Failed to remove user: ${fetchError.message}`);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) {
            setError('Message cannot be empty');
            return;
        }
        if (!user) {
            setError('User not authenticated');
            return;
        }
        if (!stompClient || !stompClient.connected) {
            setError('No WebSocket connection');
            return;
        }
        if (chatMode === 'private' && !selectedUserId) {
            setError('Select a user for private chat');
            return;
        }

        const tempId = uuidv4();
        const message = {
            senderId: Number(user.id),
            recipientId: chatMode === 'private' ? Number(selectedUserId) : null,
            groupId: chatMode === 'group' && selectedGroupId ? Number(selectedGroupId) : null,
            content: newMessage,
            type: chatMode === 'private' ? 'PRIVATE' : 'GROUP',
            createdAt: new Date().toISOString(),
            tempId,
        };

        try {
            stompClient.publish({
                destination:
                    chatMode === 'private'
                        ? '/app/chat/private'
                        : selectedGroupId
                            ? `/app/chat/group/${selectedGroupId}`
                            : '/app/chat/group',
                body: JSON.stringify(message),
            });

            setMessages((prev) => [
                ...prev,
                {
                    ...message,
                    senderId: Number(message.senderId),
                    recipientId: message.recipientId ? Number(message.recipientId) : null,
                    groupId: message.groupId ? Number(message.groupId) : null,
                    timestamp: formatDate(message.createdAt),
                    id: tempId,
                },
            ]);
            setNewMessage('');
            setError(null);
        } catch (sendError) {
            setError(`Failed to send message: ${sendError.message}`);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            setError('Group name is required');
            return;
        }
        if (selectedMemberIds.length === 0) {
            setError('At least one member is required');
            return;
        }

        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/user/chat/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: groupName,
                    memberIds: selectedMemberIds,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            setGroups((prev) => [...prev, { id: Number(data.id), name: data.name, creatorId: Number(user.id) }]);
            setGroupName('');
            setSelectedMemberIds([]);
            setCreateGroupSearchQuery('');
            setSelectedGroupId(Number(data.id));
            setChatMode('group');
            setError(null);
        } catch (fetchError) {
            setError(`Failed to create group: ${fetchError.message}`);
        }
    };

    const handleEditGroup = async () => {
        if (!editGroupName.trim()) {
            setError('Group name is required');
            return;
        }

        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editGroupName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            const data = await response.json();
            setGroups((prev) => prev.map((item) => (item.id === editGroupId ? { ...item, name: data.name } : item)));
            setEditGroupId(null);
            setEditGroupName('');
            setGroupUsers([]);
            setError(null);
        } catch (fetchError) {
            setError(`Failed to edit group: ${fetchError.message}`);
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }

            setGroups((prev) => prev.filter((item) => item.id !== groupId));
            if (selectedGroupId === groupId) {
                setSelectedGroupId(null);
                setMessages([]);
            }
            setError(null);
        } catch (fetchError) {
            setError(`Failed to delete group: ${fetchError.message}`);
        }
    };

    const toggleMember = (userId) => {
        setSelectedMemberIds((prev) =>
            prev.includes(userId) ? prev.filter((item) => item !== userId) : [...prev, userId]
        );
    };

    const openDeleteModal = (groupId) => {
        setGroupToDelete(groupId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (groupToDelete) {
            await handleDeleteGroup(groupToDelete);
            setIsModalOpen(false);
            setGroupToDelete(null);
        }
    };

    const getSenderName = (senderId) => {
        if (senderId === user.id) return 'You';
        const sender = users.find((item) => item.id === senderId);
        return sender ? `${sender.firstName} ${sender.lastName}` : `User ${senderId}`;
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const filteredPrivateUsers = useMemo(() => {
        const query = privateSearchQuery.trim().toLowerCase();
        if (!query) return users;
        return users.filter((item) =>
            `${item.firstName || ''} ${item.lastName || ''} ${item.email || ''}`.toLowerCase().includes(query)
        );
    }, [users, privateSearchQuery]);

    const createGroupCandidates = useMemo(() => {
        const query = createGroupSearchQuery.trim().toLowerCase();
        const available = users.filter((item) => item.id !== user?.id);
        if (!query) return available;
        return available.filter((item) =>
            `${item.firstName || ''} ${item.lastName || ''} ${item.email || ''}`.toLowerCase().includes(query)
        );
    }, [users, createGroupSearchQuery, user?.id]);

    if (loading && !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)]">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-[var(--accent-primary)]" />
            </div>
        );
    }

    const tabs = [
        { id: 'group', label: 'Group Chats' },
        { id: 'private', label: 'Private Chat' },
        { id: 'createGroup', label: 'Manage Groups' },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                onActivity={onActivity}
            />

            <main className={`flex-1 overflow-hidden px-4 pb-8 pt-20 transition-all duration-300 lg:pt-8 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
                <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-7xl flex-col overflow-hidden rounded-3xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-secondary)] shadow-sm">
                    <div className="border-b border-[rgba(229,231,235,0.5)] px-8 py-8">
                        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Chatroom</h1>
                        <p className="mt-2 text-[var(--text-secondary)]">
                            Connect with peers, {user?.firstName || user?.email || 'Student'}!
                        </p>
                    </div>

                    <div className="border-b border-[rgba(229,231,235,0.5)] px-8 py-4">
                        <div className="flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => {
                                        setChatMode(tab.id);
                                        setError(null);
                                    }}
                                    className={`rounded-xl px-6 py-2.5 text-sm font-medium transition ${
                                        chatMode === tab.id
                                            ? 'bg-[var(--accent-primary)] text-white'
                                            : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:opacity-90'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && (
                        <div className="mx-8 mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    {chatMode === 'group' && (
                        <div className="flex min-h-0 flex-1 flex-col">
                            <div className="border-b border-[rgba(229,231,235,0.5)] px-8 py-4">
                                <select
                                    value={selectedGroupId || ''}
                                    onChange={(event) => setSelectedGroupId(event.target.value ? Number(event.target.value) : null)}
                                    className="w-full max-w-sm rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                >
                                    <option value="">Main Group Chat</option>
                                    {groups.map((group) => (
                                        <option key={group.id} value={group.id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 overflow-y-auto px-8 py-6">
                                {loading ? (
                                    <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                                        Loading messages...
                                    </div>
                                ) : messages.length === 0 ? (
                                    <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                                        No messages found.
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {messages.map((message) => (
                                            <div
                                                key={message.id}
                                                className={`max-w-3xl rounded-2xl px-4 py-3 ${
                                                    Number(message.senderId) === Number(user?.id)
                                                        ? 'ml-auto bg-[var(--accent-primary)] text-white'
                                                        : 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
                                                }`}
                                            >
                                                <div className="mb-1 flex items-center justify-between gap-4">
                                                    <span className="text-xs font-semibold opacity-90">{getSenderName(Number(message.senderId))}</span>
                                                    <span className="text-[11px] opacity-75">{message.timestamp}</span>
                                                </div>
                                                <p className="text-sm leading-relaxed">{message.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-[rgba(229,231,235,0.5)] px-8 py-6">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        value={newMessage}
                                        onChange={(event) => setNewMessage(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                handleSendMessage();
                                            }
                                        }}
                                        className="flex-1 rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendMessage}
                                        className="rounded-xl bg-[var(--accent-primary)] p-3 text-white transition hover:opacity-90"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {chatMode === 'private' && (
                        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
                            <div className="border-b border-r border-[rgba(229,231,235,0.5)] px-6 py-6 lg:border-b-0">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={privateSearchQuery}
                                    onChange={(event) => setPrivateSearchQuery(event.target.value)}
                                    className="mb-4 w-full rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                />

                                <div className="max-h-[60vh] space-y-2 overflow-y-auto">
                                    {filteredPrivateUsers.map((item) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setSelectedUserId(Number(item.id))}
                                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                                                Number(selectedUserId) === Number(item.id)
                                                    ? 'bg-[var(--accent-primary)] text-white'
                                                    : 'bg-[var(--bg-primary)] text-[var(--text-primary)] hover:opacity-90'
                                            }`}
                                        >
                                            <div>
                                                <p className="font-medium">{`${item.firstName || ''} ${item.lastName || ''}`.trim() || item.email}</p>
                                                <p className="text-xs opacity-75">{item.email}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex min-h-0 flex-1 flex-col">
                                <div className="border-b border-[rgba(229,231,235,0.5)] px-8 py-4">
                                    <p className="text-sm font-medium text-[var(--text-primary)]">
                                        {selectedUserId
                                            ? `Private chat with ${getSenderName(Number(selectedUserId))}`
                                            : 'Select a user to start a private chat.'}
                                    </p>
                                </div>

                                <div className="flex-1 overflow-y-auto px-8 py-6">
                                    {!selectedUserId ? (
                                        <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                                            Select a user to start a private chat.
                                        </div>
                                    ) : loading ? (
                                        <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                                            Loading messages...
                                        </div>
                                    ) : messages.length === 0 ? (
                                        <div className="flex h-full items-center justify-center text-sm text-[var(--text-secondary)]">
                                            No messages found.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {messages.map((message) => (
                                                <div
                                                    key={message.id}
                                                    className={`max-w-3xl rounded-2xl px-4 py-3 ${
                                                        Number(message.senderId) === Number(user?.id)
                                                            ? 'ml-auto bg-[var(--accent-primary)] text-white'
                                                            : 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
                                                    }`}
                                                >
                                                    <div className="mb-1 flex items-center justify-between gap-4">
                                                        <span className="text-xs font-semibold opacity-90">{getSenderName(Number(message.senderId))}</span>
                                                        <span className="text-[11px] opacity-75">{message.timestamp}</span>
                                                    </div>
                                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-[rgba(229,231,235,0.5)] px-8 py-6">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={newMessage}
                                            onChange={(event) => setNewMessage(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    handleSendMessage();
                                                }
                                            }}
                                            className="flex-1 rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-primary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSendMessage}
                                            className="rounded-xl bg-[var(--accent-primary)] p-3 text-white transition hover:opacity-90"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {chatMode === 'createGroup' && (
                        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto px-8 py-8 lg:grid-cols-[360px_minmax(0,1fr)]">
                            <div className="rounded-3xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)] p-6">
                                <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">Create Group</h2>
                                <p className="mb-6 text-sm text-[var(--text-secondary)]">Create a new group and add members.</p>

                                <input
                                    type="text"
                                    placeholder="Group name"
                                    value={groupName}
                                    onChange={(event) => setGroupName(event.target.value)}
                                    className="mb-4 w-full rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                />

                                <input
                                    type="text"
                                    placeholder="Search members..."
                                    value={createGroupSearchQuery}
                                    onChange={(event) => setCreateGroupSearchQuery(event.target.value)}
                                    className="mb-4 w-full rounded-xl border border-[rgba(229,231,235,0.9)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)]"
                                />

                                <div className="mb-6 max-h-72 space-y-2 overflow-y-auto">
                                    {createGroupCandidates.map((item) => (
                                        <label
                                            key={item.id}
                                            className="flex cursor-pointer items-center justify-between rounded-2xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-secondary)] px-4 py-3"
                                        >
                                            <div>
                                                <p className="font-medium text-[var(--text-primary)]">
                                                    {`${item.firstName || ''} ${item.lastName || ''}`.trim() || item.email}
                                                </p>
                                                <p className="text-xs text-[var(--text-secondary)]">{item.email}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={selectedMemberIds.includes(item.id)}
                                                onChange={() => toggleMember(item.id)}
                                                className="h-4 w-4"
                                            />
                                        </label>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleCreateGroup}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Create Group</span>
                                </button>
                            </div>

                            <div className="rounded-3xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-primary)] p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-[var(--text-primary)]">Manage Groups</h2>
                                        <p className="text-sm text-[var(--text-secondary)]">Edit members, view users, or remove a group.</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {groups.length === 0 ? (
                                        <p className="text-sm text-[var(--text-secondary)]">No groups found.</p>
                                    ) : (
                                        groups.map((group) => (
                                            <div
                                                key={group.id}
                                                className="flex flex-col gap-4 rounded-2xl border border-[rgba(229,231,235,0.5)] bg-[var(--bg-secondary)] px-5 py-4 md:flex-row md:items-center md:justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-[var(--text-primary)]">{group.name}</p>
                                                    <p className="text-xs text-[var(--text-secondary)]">
                                                        {group.creatorId === user?.id ? 'You created this group' : 'Shared group'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            setEditGroupId(group.id);
                                                            setEditGroupName(group.name);
                                                            await fetchGroupUsers(group.id);
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                                                    >
                                                        <Users className="h-4 w-4" />
                                                        <span>Manage</span>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={async () => {
                                                            setEditGroupId(group.id);
                                                            setEditGroupName(group.name);
                                                            await fetchGroupUsers(group.id);
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-xl bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        <span>View</span>
                                                    </button>
                                                    {isAdmin(group.id) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => openDeleteModal(group.id)}
                                                            className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span>Delete</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <GroupUsersModal
                    editGroupId={editGroupId}
                    editGroupName={editGroupName}
                    setEditGroupName={setEditGroupName}
                    setEditGroupId={setEditGroupId}
                    handleEditGroup={handleEditGroup}
                    groupUsers={groupUsers}
                    handleRemoveUser={handleRemoveUser}
                    availableUsers={users}
                    handleAddUser={handleAddUser}
                    isAdmin={isAdmin(editGroupId)}
                    currentUserId={Number(user?.id)}
                />

                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Group"
                    message="Are you sure you want to delete this group?"
                />
            </main>
        </div>
    );
};

Chatroom.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
    }),
    isCollapsed: PropTypes.bool,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool,
    notifications: PropTypes.array,
    onActivity: PropTypes.func,
};

Chatroom.defaultProps = {
    user: null,
    isCollapsed: true,
    darkMode: false,
    notifications: [],
    onActivity: undefined,
};

export default Chatroom;
