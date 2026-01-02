import { Link, useNavigate } from "react-router";
import { Bookmark, Moon, User, LogOut } from "lucide-react";

type NavbarProps = {
  title?: string;
  onToggleTheme?: () => void;
};

export default function Navbar({
  title = "Recenzje & Rekomendacje",
  onToggleTheme,
}: NavbarProps) {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: tu później wyczyścisz tokeny / session
    // localStorage.removeItem("token");
    navigate("/auth/login");
  }

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Left */}
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
            <Bookmark size={18} className="text-slate-700" />
          </span>
          <span className="text-lg font-semibold text-slate-900">{title}</span>
        </Link>

        {/* Right */}
        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            aria-label="Zmień motyw"
            title="Zmień motyw"
          >
            <Moon size={20} className="text-slate-700" />
          </button>

          <Link
            to="/profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            aria-label="Profil"
            title="Profil"
          >
            <User size={20} className="text-slate-700" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100"
            aria-label="Wyloguj"
            title="Wyloguj"
          >
            <LogOut size={20} className="text-slate-700" />
          </button>
        </nav>
      </div>
    </header>
  );
}
