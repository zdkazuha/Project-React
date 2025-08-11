import React, { useContext, useEffect } from "react";
import { AccountContext } from "../contexts/account.context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/toast.context";

export default function LogoutPage() {
    
    const {clear} = useContext(AccountContext);
    const navigate = useNavigate();
    const {showToast} = useToast()

    useEffect(() => {
        clear();
        navigate("/");
        showToast("YYou have successfully signed out of your account!", "success");
    }, [])

    return <></>;
}