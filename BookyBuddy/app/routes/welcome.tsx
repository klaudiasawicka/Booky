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
      let tab = await BookService.getAllBooks();
      setTabBooks(tab);
    };
    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <div className="flex w-full justify-end">
        <Button
          type="button"
          className="w-auto flex p-2 justify-center items-center"
          onClick={() => navigate("../addnewrec")}
        >
          <Plus /> <p className="pl-2">Dodaj recenzję</p>
        </Button>
      </div>
      <div className="flex flex-wrap w-full gap-4 mt-4 justify-center items-center">
        {" "}
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
      </div>
    </main>
  );
}

export default Welcome;
