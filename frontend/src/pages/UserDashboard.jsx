import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function UserDashboard() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { token, user } = useContext(AuthContext);

    useEffect(() => {
        const fetchMyFeedback = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/feedback/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFeedbacks(res.data);
            } catch (err) {
                setError('Failed to load your feedbacks.');
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            fetchMyFeedback();
        }
    }, [token]);

    return (
        <div className="container">
            <h1 className="page-title">Welcome, {user?.name}</h1>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Here is the anonymous feedback you've received.
            </p>

            {error && <div className="error-msg">{error}</div>}

            {isLoading ? (
                <div className="text-center" style={{ padding: '2rem' }}>Loading feedbacks...</div>
            ) : feedbacks.length === 0 ? (
                <div className="glass-panel text-center" style={{ padding: '3rem' }}>
                    <h3 style={{ color: 'var(--text-secondary)' }}>No feedback received yet.</h3>
                    <p>Share the platform with others to receive anonymous thoughts!</p>
                </div>
            ) : (
                <div className="feedback-grid">
                    {feedbacks.map(fb => (
                        <div key={fb.id} className="glass-panel feedback-card">
                            <div className="feedback-header">
                                <span>Anonymous</span>
                                <span>{new Date(fb.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="feedback-body">
                                "{fb.message}"
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
