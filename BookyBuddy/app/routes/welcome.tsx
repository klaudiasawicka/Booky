import { NavLink, useNavigate } from "react-router";
import { Plus } from "lucide-react";
import Card from "~/components/ReviewCard";
import img from "~/img/pobrane.jpg";
import Button from "~/components/ui/Button";

function Welcome() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <Button
        type="button"
        className="w-auto flex flex-row p-2 justify-center items-center"
        onClick={() => navigate("../addnewrec")}
      >
        <Plus /> <p className="pl-2">Dodaj recenzję</p>
      </Button>
      <Card
        imageUrl={img}
        category="Książka"
        title="Sztuka głębokiego czytania"
        author="Maryanne Wolf"
        description="Fascynująca książka o tym, jak czytanie wpływa na nasz mózg i sposób myślenia w erze cyfrowej."
        rating={5}
        reviewBy="Anna Kowalska"
      />
      <Button
        type="button"
        className="w-auto"
        onClick={() => navigate("../reviewDetails")}
      >
        testujemy
      </Button>
    </main>
  );
}

export default Welcome;
