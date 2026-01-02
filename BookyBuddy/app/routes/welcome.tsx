import { NavLink } from "react-router";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <header className="flex flex-col items-center gap-9">
        <nav className="flex flex-col items-center justify-center gap-5">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/login" end>
            Login 😈
          </NavLink>
          <NavLink to="/register">Rejestracja 🤣</NavLink>
          <NavLink to="/account">Account</NavLink>
        </nav>
      </header>
    </main>
  );
}
