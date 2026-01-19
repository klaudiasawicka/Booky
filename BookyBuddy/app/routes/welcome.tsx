import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Card from "~/components/ReviewCard";
import Button from "~/components/ui/Button";
import type { Book } from "~/types/BookType";
import BookService from "~/services/BookService";

function Welcome() {
  const navigate = useNavigate();
  const [tabBooks, setTabBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let tablica = await BookService.getAllBooks();
      setTabBooks(tablica);
    };
    fetchData();
  }, []);

  return (
    <main className="flex items-center justify-center pt-16 pb-4 gap-4">
      <Button
        type="button"
        className="w-auto flex flex-row p-2 justify-center items-center"
        onClick={() => navigate("../addnewrec")}
      >
        <Plus /> <p className="pl-2">Dodaj recenzję</p>
      </Button>
      {tabBooks.map((book) => (
        <div key={book.id}>
          <Card
            bookId={book.id}
            coverUrl={book.coverUrl}
            title={book.title}
            author={book.author}
            rating={book.avgRating}
          />
        </div>
      ))}
    </main>
  );
}

export default Welcome;
