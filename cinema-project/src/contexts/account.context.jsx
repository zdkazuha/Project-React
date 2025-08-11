import React, { createContext, useState } from 'react';

export const AccountContext = createContext({
    email: null,
    setEmail: () => {},
    clear: () => {},
    isAuth: () => null,
});

export const AccountProvider = ({ children }) => {

    const [email, setEmail] = useState(null);

    const clear = () => { setEmail(null); };

    const isAuth = () => { return email !== null; };

    return (
        <AccountContext.Provider value={{ email, setEmail, clear, isAuth }}>
            {children}
        </AccountContext.Provider>
    );
}