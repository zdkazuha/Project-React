const key_m = "movies_id";
const key_s = "sesions_id";

function LoadFavorite(isAuth, email) {
    const key_m_a = `${email}_account`;
    if (isAuth()) 
        return JSON.parse(localStorage.getItem(key_m_a)) ?? []
    else
        return JSON.parse(localStorage.getItem(key_m)) ?? []
}

function UpdateLocalStorage(id, isAuth, email) {
    const key_m_a = `${email}_account`;
    let id_localStorage = LoadFavorite(isAuth, email);

    id = Number(id); 

    if (id_localStorage.includes(id))
        id_localStorage = id_localStorage.filter(movieId => movieId !== id);
    else 
        id_localStorage.push(id);

    if (isAuth) 
        localStorage.setItem(key_m_a, JSON.stringify(id_localStorage));
    else
        localStorage.setItem(key_m, JSON.stringify(id_localStorage));
}

function IsFavorite(id, isAuth, email) {
    const id_localStorage = LoadFavorite(isAuth, email) || [];
    return id_localStorage.includes(Number(id));
}


// ------------------------------------------------ //

function LoadFavoriteSession(isAuth, email) {
    const key_s_a = `${email}_account_sessions`;
    if (isAuth()) 
        return JSON.parse(localStorage.getItem(key_s_a)) ?? []
    else
        return JSON.parse(localStorage.getItem(key_s)) ?? []
}

function UpdateSessionLocalStorage(id, isAuth, email) {
    const key_s_a = `${email}_account_sessions`;
    let sessions_localStorage = LoadFavoriteSession(isAuth, email);

    id = Number(id); 

    if (sessions_localStorage.includes(id)) 
        sessions_localStorage = sessions_localStorage.filter(session => session !== id);
    else 
        sessions_localStorage.push(id);

    if (isAuth()) 
        localStorage.setItem(key_s_a, JSON.stringify(sessions_localStorage));
    else
        localStorage.setItem(key_s, JSON.stringify(sessions_localStorage));
}

function IsFavoriteSession(id, isAuth, email) {
    const sessions_localStorage = LoadFavoriteSession(isAuth, email);
    return sessions_localStorage.includes(Number(id));
}

export {
    UpdateLocalStorage, LoadFavorite, IsFavorite,
    UpdateSessionLocalStorage, LoadFavoriteSession, IsFavoriteSession
};
