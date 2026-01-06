import { useState } from "react";
import { CoverUpload } from "../components/layout/CoverUpload";
import Button from "~/components/ui/Button";
import Input from "~/components/ui/Input";
import Textarea from "~/components/ui/Textarea";
import { useNavigate } from "react-router";

function AddRec() {
  const [cover, setCover] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <form className="space-y-6">
      {/* okładka */}
      <CoverUpload value={cover} onChange={setCover} />

      <div>
        <label className="flex flex-row text-sm font-medium">
          Opis<p className="text-red-500 pl-1">*</p>
        </label>
        <Textarea />
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
