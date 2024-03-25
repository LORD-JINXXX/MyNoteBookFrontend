import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children, store }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (token,userId) => {
        // Add your login logic here, for example, sending a request to the server.
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);

    };

    const logout = () => {
        // Add your logout logic here, for example, clearing the authentication token.
        localStorage.clear('token');
        localStorage.clear('userId');
        localStorage.clear('isLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout } } >
            {children}
        </AuthContext.Provider>
    );
};