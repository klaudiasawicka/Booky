import { useState, type SetStateAction } from "react";
import { CoverUpload } from "../components/layout/CoverUpload";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import Textarea from "~/components/ui/Textarea";
import { useNavigate } from "react-router";
import { fetchClient } from "~/services/api";

function AddRec() {
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (cover) {
      formData.append("cover", cover);
    }
    const bookBlob = new Blob(
      [JSON.stringify({ title, author, description })],
      { type: "application/json" },
    );

    formData.append("book", bookBlob);

    try {
      await fetchClient("/books", { method: "POST", body: formData });
      navigate("../welcome");
    } catch (error) {
      console.error("Błąd podczas dodawania:", error);
    }
  };

  return (
    <form onSubmit={handleSumbit} className="space-y-6">
      {/* okładka */}
      <CoverUpload value={cover} onChange={setCover} />
      <div>
        <label className="flex flex-row text-sm font-medium">
          Opis<p className="text-red-500 pl-1">*</p>
        </label>
        <Textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
                    placeholder={"Podaj opis"}
        />
        <label className="flex flex-row text-sm font-medium">
          Tytuł
          <p className="text-red-500 pl-1">*</p>
        </label>
        <Input
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder={"Podaj tytuł"}
        />
        <label className="flex flex-row text-sm font-medium">
          Autor<p className="text-red-500 pl-1">*</p>
        </label>
        <Input
          value={author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
          placeholder={"Podaj autora"}
        />
      </div>
      <div className="flex justify-end items-end">
        <Button className="mr-4" onClick={() => navigate("../welcome")}>
          Anuluj
        </Button>
        <Button type="submit">Dodaj recenzję</Button>
      </div>
    </form>
  );
}
export default AddRec;
