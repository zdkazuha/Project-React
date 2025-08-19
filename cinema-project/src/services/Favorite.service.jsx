const key_m = "movies_id";
const key_s = "sesions_id";

function UpdateLocalStorage(id) {
    let id_localStorage = LoadFavorite();
    if (id_localStorage.includes(id)) {
        id_localStorage = id_localStorage.filter(movieId => movieId !== id);
    } else {
        id_localStorage.push(id);
    }
    localStorage.setItem(key_m, JSON.stringify(id_localStorage));
}

function LoadFavorite() {
    return JSON.parse(localStorage.getItem(key_m)) ?? []
}

function IsFavorite(id) {
    const id_localStorage = LoadFavorite() || [];
    return id_localStorage.includes(Number(id));
}

// ------------------------------------------------ //
function UpdateSessionLocalStorage(id) {
    let sessions_localStorage = LoadFavoriteSession();
    if (sessions_localStorage.includes(id)) {
        sessions_localStorage = sessions_localStorage.filter(session => session !== id);
    } else {
        sessions_localStorage.push(id);
    }
    localStorage.setItem(key_s, JSON.stringify(sessions_localStorage));
}

function LoadFavoriteSession() {
    return JSON.parse(localStorage.getItem(key_s)) ?? []
}

function IsFavoriteSession(id) {
    const sessions_localStorage = LoadFavoriteSession();
    return sessions_localStorage.includes(id);
}

export {
    UpdateLocalStorage, LoadFavorite, IsFavorite,
    UpdateSessionLocalStorage, LoadFavoriteSession, IsFavoriteSession
};