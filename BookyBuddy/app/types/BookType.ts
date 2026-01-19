// Użytkownik wpisuje tu dane w formularzu
export interface BookBase {
  title: string;
  author: string;
  tags: string[];
}

// tutaj znajdują się rzeczy któtre dostajemy z serwera
export interface Book extends BookBase {
  id: string;
  avgRating: number;
  ratingsCount: number;
  coverUrl: string;
}

// tutaj znajdują się rzeczy które wymaga swagger
export interface CreateBook {
  book: string;
  cover: File;
}

// tutaaj znajdują się rzeczy do opini
export interface Rating {
  id: string;
  bookId: string;
  userId: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface RateBookRequest {
  rating: number;
  comment: string;
}
