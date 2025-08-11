import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = "info") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div style={{ position: "fixed", top: 16, left: 780 }}>
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        style={{
                            marginBottom: "10px",
                            height: "20px",
                            width: "Auto",
                            padding: "10px 20px",
                            gap: "-5px",
                            color: "white",
                            fontWeight: "small",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                            borderRadius: "5px",
                            backgroundColor: "#181a1b",
                        }}
                    >
                        {t.type === `success` ? `✅ ${t.message}` : t.type === `error` ? `❌ ${t.message}` : t.type === `info` ? `ℹ️ ${t.message}` : t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}