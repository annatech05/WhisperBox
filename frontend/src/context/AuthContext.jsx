import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // We stored role as 'ROLE_USER' or 'ROLE_ADMIN' in spring, but we might just have id and email in token claims...
                // Actually, backend returns full user info in AuthResponse.
                // Let's decode or simply fetch user. We could just use the token to set state, but since we don't have a /me endpoint,
                // we'll rely on the user object stored in localStorage during login.
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (err) {
                console.error("Invalid token");
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    const login = (userData, jwtToken) => {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(jwtToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
