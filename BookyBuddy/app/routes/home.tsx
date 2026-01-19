import type { Route } from "./+types/home";
import  Welcome  from "./welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BookyBuddy" },
    { name: "description", content: "Witaj w BookyBuddy!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
