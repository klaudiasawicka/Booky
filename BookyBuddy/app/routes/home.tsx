import type { Route } from "./+types/home";
import { Welcome } from "./welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "BokkyBuddy" },
    { name: "description", content: "Welcome to BokkyBuddy!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
