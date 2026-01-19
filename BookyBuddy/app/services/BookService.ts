import {fetchClient} from "~/services/api"
import type {Book, CreateBook, Rating, RateBookRequest} from "~/types/BookType";

const BookService = {
    // POST
    postCreateBook: async (data: FormData): Promise<Book> => {
        return await fetchClient("/books", {
            method: "POST",
            body: data
        })
    },
    postRateBook: async (bookId: string, data: RateBookRequest): Promise<Rating> => {
        // sprawdzamy czy jest komentarz lub ocena
        if (!data.comment || data.rating < 1) {
            throw new Error("Brakuje komentarza lub oceny");
        }
        return await fetchClient(`/books/${bookId}/rate`, {
            method: "POST",
            body: JSON.stringify({
                bookId: bookId,
                rating: data.rating,
                comment: data.comment
            })
        })

    },

    // GET
    getAllBooks: async (): Promise<Book[]> => {
        return await fetchClient("/books")
    },
    getBook: async (bookId: string): Promise<Book> => {
        return await fetchClient(`/books/${bookId}`)

    },
    GetRatingBook: async (bookId: string): Promise<Rating[]> => {
        return await fetchClient(`books/${bookId}/ratings`)
    },
    getRecommendationCurrentlyUser: async (): Promise<Book[]> => {
        return await fetchClient("/books/recommendations")
    },

    // DELETE
    DeleteBook: async (bookId: string): Promise<void> => {
        return await fetchClient(`/books/${bookId}`, {
            method: "DELETE"
        })
    },
}

export default BookService