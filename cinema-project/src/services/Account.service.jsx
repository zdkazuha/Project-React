import { useContext } from "react";
import { AccountContext } from "../contexts/account.context";

const { email } = useContext(AccountContext);


const key_a = `Accounts`;
const key_e = `${email}_account`;

function LoadAccount() {
    const storedEmail = localStorage.getItem(key_e);
    if (storedEmail) {
        return true;
    }
}

function SaveAccount() {
    localStorage.setItem(key_a, JSON.stringify(key_e));
}

export {
    LoadAccount, SaveAccount
};