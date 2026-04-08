import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubmitFeedback() {
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({ type: '', msg: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/users');
                setUsers(res.data);
                if (res.data.length > 0) {
                    setReceiverId(res.data[0].id);
                }
            } catch (err) {
                console.error('Failed to fetch users', err);
            }
        };
        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', msg: '' });
        
        if (!receiverId || !message) {
            setStatus({ type: 'error', msg: 'Please select a user and write a message.' });
            return;
        }

        setIsLoading(true);
        try {
            await axios.post('http://localhost:8080/api/feedback', {
                receiverId: parseInt(receiverId),
                message
            });
            setStatus({ type: 'success', msg: 'Your anonymous feedback was securely sent!' });
            setMessage('');
        } catch (err) {
            setStatus({ type: 'error', msg: 'Failed to send feedback. Please try again later.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div className="glass-panel mt-4">
                <h1 className="page-title text-center">Send Anonymous Feedback</h1>
                <p className="text-center mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Share your honest thoughts securely. The recipient will never know who sent it.
                </p>
                
                {status.msg && (
                    <div className={status.type === 'error' ? 'error-msg' : 'success-msg'}>
                        {status.msg}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Select Recipient</label>
                        <select 
                            className="form-input" 
                            value={receiverId} 
                            onChange={(e) => setReceiverId(e.target.value)}
                            required
                        >
                            <option value="" disabled>--- Select a user ---</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Your Feedback message</label>
                        <textarea 
                            className="form-input" 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            required 
                            placeholder="Write your constructive feedback here..."
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
                        {isLoading ? 'Sending Safely...' : 'Send Anonymously'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SubmitFeedback;
