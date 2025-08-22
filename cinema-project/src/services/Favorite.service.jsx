const key_m = "movies_id";
const key_s = "sesions_id";
const key_t = "ticket_id";
const keyTickets = "tickets_available";

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

    if (isAuth()) 
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

// ------------------------------------------------ //

function LoadTicket(isAuth, email) {
    const key_t_a = `${email}_account_ticket`;
    if (isAuth()) 
        return JSON.parse(localStorage.getItem(key_t_a)) ?? []
    else
        return JSON.parse(localStorage.getItem(key_t)) ?? []
}

function UpdateTicket(id, isAuth, email) {
    const key_t_a = `${email}_account_ticket`;
    let ticket_localStorage = LoadTicket(isAuth, email);

    id = Number(id); 

    if (ticket_localStorage.includes(id)) 
        ticket_localStorage = ticket_localStorage.filter(ticket => ticket !== id);
    else 
        ticket_localStorage.push(id);

    if (isAuth()) 
        localStorage.setItem(key_t_a, JSON.stringify(ticket_localStorage));
    else
        localStorage.setItem(key_t, JSON.stringify(ticket_localStorage));
}

function IsBookATicket(id, isAuth, email) {
    const ticket_localStorage = LoadTicket(isAuth, email);
    return ticket_localStorage.includes(Number(id));
}

// ------------------------------------------------ //

function loadTickets() {
    return JSON.parse(localStorage.getItem(keyTickets)) ?? [];
}

function saveTickets(tickets) {
    localStorage.setItem(keyTickets, JSON.stringify(tickets));
}

export {
    UpdateLocalStorage, LoadFavorite, IsFavorite,
    UpdateSessionLocalStorage, LoadFavoriteSession, IsFavoriteSession,
    LoadTicket, UpdateTicket, IsBookATicket, loadTickets, saveTickets
};
