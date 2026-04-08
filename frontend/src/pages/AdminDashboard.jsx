import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function AdminDashboard() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('feedback');
    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        if (activeTab === 'feedback') {
            fetchFeedbacks();
        } else {
            fetchUsers();
        }
    }, [token, activeTab]);

    const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('http://localhost:8080/api/feedback/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(res.data);
            setError('');
        } catch (err) {
            setError('Failed to load all feedbacks. Access maybe denied.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get('http://localhost:8080/api/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data);
            setError('');
        } catch (err) {
            setError('Failed to load users.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/feedback/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFeedbacks(feedbacks.filter(fb => fb.id !== id));
        } catch (err) {
            alert('Failed to delete feedback');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? ALL of their received feedback will also be deleted!")) return;
        
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    if (user?.role !== 'ADMIN') {
        return <div className="container mt-4"><h2 className="error-msg">Access Denied. Admins only.</h2></div>;
    }

    return (
        <div className="container">
            <h1 className="page-title">Admin Dashboard</h1>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                System-wide management
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                    className={`btn ${activeTab === 'feedback' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('feedback')}
                >
                    Manage Feedback
                </button>
                <button 
                    className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => setActiveTab('users')}
                >
                    Manage Users
                </button>
            </div>

            {error && <div className="error-msg">{error}</div>}

            {isLoading ? (
                <div className="text-center" style={{ padding: '2rem' }}>Loading data...</div>
            ) : activeTab === 'feedback' ? (
                <div className="feedback-grid">
                    {feedbacks.map(fb => (
                        <div key={fb.id} className="glass-panel feedback-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="feedback-header">
                                <span>To: <strong style={{ color: 'var(--accent)' }}>{fb.receiverName}</strong></span>
                                <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="feedback-body" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                                "{fb.message}"
                            </div>
                            <button 
                                className="btn btn-danger" 
                                style={{ width: '100%', padding: '0.5rem' }}
                                onClick={() => handleDeleteFeedback(fb.id)}
                            >
                                Delete Feedback
                            </button>
                        </div>
                    ))}
                    {feedbacks.length === 0 && !error && (
                        <p>No feedback in the system.</p>
                    )}
                </div>
            ) : (
                <div className="feedback-grid">
                    {users.map(u => (
                        <div key={u.id} className="glass-panel feedback-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="feedback-header">
                                <span>ID: {u.id}</span>
                            </div>
                            <div className="feedback-body" style={{ flexGrow: 1, marginBottom: '1.5rem' }}>
                                <strong style={{ color: 'var(--accent)' }}>{u.name}</strong>
                            </div>
                            <button 
                                className="btn btn-danger" 
                                style={{ width: '100%', padding: '0.5rem' }}
                                onClick={() => handleDeleteUser(u.id)}
                            >
                                Delete User
                            </button>
                        </div>
                    ))}
                    {users.length === 0 && !error && (
                        <p>No users found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
