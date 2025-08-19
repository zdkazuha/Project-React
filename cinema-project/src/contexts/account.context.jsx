import React, { createContext, useState } from 'react';

export const AccountContext = createContext({
    email: null,
    setEmail: () => { },
    clear: () => { },
    isAuth: () => null,
    isAdmin: () => null,
});

export const AccountProvider = ({ children }) => {

    const [email, setEmail] = useState("Admin");

    const clear = () => { setEmail(null); };

    const isAuth = () => { return email !== null; };

    const isAdmin = () => { return email === "Admin"; };

    return (
        <AccountContext.Provider value={{ email, setEmail, clear, isAuth, isAdmin }}>
            {children}
        </AccountContext.Provider>
    );
}

