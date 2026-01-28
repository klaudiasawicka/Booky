import { useState, type SetStateAction } from "react";
import { CoverUpload } from "../components/layout/CoverUpload";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import Textarea from "~/components/ui/Textarea";
import { useNavigate } from "react-router";
import { fetchClient } from "~/services/api";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddBookSchema = z.object({
  title: z.string().min(1, "Tytuł nie może być pusty"),
  author: z.string().min(1, "Podaj autora"),
  description: z.string().min(1, "Podaj opis książki"),
});

type AddBookForm = z.infer<typeof AddBookSchema>;

function AddRec() {
  const [cover, setCover] = useState<File | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddBookForm>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: AddBookForm) => {
    const formData = new FormData();

    if (cover) {
      formData.append("cover", cover);
    }

    const bookBlob = new Blob(
      [JSON.stringify({ title: values.title, author: values.author })],
      {
        type: "application/json",
      },
    );

    formData.append("book", bookBlob, "book.json");

    try {
      await fetchClient("/books", { method: "POST", body: formData });
      navigate("../welcome");
    } catch (error) {
      console.error("Błąd podczas dodawania:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* okładka */}
      <CoverUpload value={cover} onChange={setCover} />
      <div className="space-y-4">
        {/* Tytuł */}
        <div>
          <label className="flex flex-row text-sm font-medium">
            Tytuł <span className="text-red-500 pl-1">*</span>
          </label>
          <Input {...register("title")} placeholder="Podaj tytuł" />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Autor */}
        <div>
          <label className="flex flex-row text-sm font-medium">
            Autor <span className="text-red-500 pl-1">*</span>
          </label>
          <Input {...register("author")} placeholder="Podaj autora" />
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Opis */}
        <div>
          <label className="flex flex-row text-sm font-medium">
            Opis <span className="text-red-500 pl-1">*</span>
          </label>
          <Textarea {...register("description")} placeholder="Podaj opis" />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Button className="mr-4" onClick={() => navigate("../welcome")}>
          Anuluj
        </Button>
        <Button type="submit">Dodaj książkę</Button>
      </div>
    </form>
  );
}
export default AddRec;
