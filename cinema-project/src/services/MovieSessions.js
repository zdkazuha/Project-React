export let movieSession = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Science Fiction",
    durationMinutes: 169,
    rating: 8.6,
    date: "2025-08-12",
    time: "19:00:00",
    hall: 1,
    ageRestriction: 12,
    ticketPrice: 150,
    ticketsAvailable: 1
  },
  {
    id: 2,
    title: "Inception",
    genre: "Thriller",
    durationMinutes: 148,
    rating: 8.8,
    date: "2025-08-12",
    time: "21:30:00",
    hall: 1,
    ageRestriction: 14,
    ticketPrice: 150,
    ticketsAvailable: 60
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    durationMinutes: 152,
    rating: 9.0,
    date: "2025-08-13",
    time: "18:00:00",
    hall: 2,
    ageRestriction: 16,
    ticketPrice: 170,
    ticketsAvailable: 55
  },
  {
    id: 4,
    title: "What Happens in Vegas",
    genre: "Comedy",
    durationMinutes: 100,
    rating: 7.5,
    date: "2025-08-13",
    time: "20:30:00",
    hall: 2,
    ageRestriction: 16,
    ticketPrice: 130,
    ticketsAvailable: 40
  },
  {
    id: 5,
    title: "Forrest Gump",
    genre: "Drama",
    durationMinutes: 142,
    rating: 8.8,
    date: "2025-08-14",
    time: "19:00:00",
    hall: 3,
    ageRestriction: 12,
    ticketPrice: 140,
    ticketsAvailable: 50
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Science Fiction",
    durationMinutes: 136,
    rating: 8.7,
    date: "2025-08-14",
    time: "21:30:00",
    hall: 3,
    ageRestriction: 16,
    ticketPrice: 160,
    ticketsAvailable: 60
  },
  {
    id: 7,
    title: "Titanic",
    genre: "Romance, Drama",
    durationMinutes: 195,
    rating: 7.8,
    date: "2025-08-15",
    time: "18:00:00",
    hall: 1,
    ageRestriction: 12,
    ticketPrice: 180,
    ticketsAvailable: 45
  },
  {
    id: 8,
    title: "Pirates of the Caribbean",
    genre: "Adventure",
    durationMinutes: 143,
    rating: 8.0,
    date: "2025-08-15",
    time: "21:00:00",
    hall: 2,
    ageRestriction: 14,
    ticketPrice: 150,
    ticketsAvailable: 55
  },
  {
    id: 9,
    title: "Spider-Man",
    genre: "Superhero",
    durationMinutes: 130,
    rating: 7.4,
    date: "2025-08-16",
    time: "19:00:00",
    hall: 3,
    ageRestriction: 12,
    ticketPrice: 150,
    ticketsAvailable: 50
  },
  {
    id: 10,
    title: "Joker",
    genre: "Drama, Thriller",
    durationMinutes: 122,
    rating: 8.5,
    date: "2025-08-16",
    time: "21:30:00",
    hall: 1,
    ageRestriction: 18,
    ticketPrice: 170,
    ticketsAvailable: 40
  }
];


export const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Documentary", "Drama", "Family", "Fantasy", "History", "Horror",
  "Music", "Musical", "Mystery", "Romance", "Science Fiction", "Sport",
  "Thriller", "War", "Western", "Superhero", "Noir", "Short Film", "Experimental"
];

export const saveSessions = (sessions) => {
  localStorage.setItem('movieSessions', JSON.stringify(sessions));
};

export const loadSessions = () => {
  const saved = localStorage.getItem('movieSessions');
  return saved ? JSON.parse(saved) : movieSession;
};