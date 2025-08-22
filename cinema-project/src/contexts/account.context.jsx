import React, { createContext, useState, useEffect } from 'react';

export const AccountContext = createContext({
    email: null,
    setEmail: () => {},
    clear: () => {},
    isAuth: () => null,
    isAdmin: () => null,
    getEmail: ()  => null,
});

export const AccountProvider = ({ children }) => {
    const [email, setEmail] = useState(() => {
        return localStorage.getItem('email') || null;
    });

    useEffect(() => {
        if (email) {
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }
    }, [email]);

    const clear = () => { setEmail(null); };
    const isAuth = () => email !== null;
    const isAdmin = () => email === "Admin";

    return (
        <AccountContext.Provider value={{ email, setEmail, clear, isAuth, isAdmin }}>
            {children}
        </AccountContext.Provider>
    );
}
