import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  // layout dla App czyli strony po zalogowaniu
  layout("routes/app.tsx", [
    index("routes/home.tsx"),
    route("welcome", "routes/welcome.tsx"), // /welcome
    route("addnewrec", "routes/addrec.tsx"), // dodanie nowej recenzji
    route("profileDetails", "routes/profileDetails.tsx"), // strona profilowa
  ]),

  // layout dla Auth czyli login, rejestracja
  layout("routes/auth.tsx", [
    route("login", "routes/login.tsx"), // /login
    route("register", "routes/register.tsx"), // /register
  ]),
] satisfies RouteConfig;
