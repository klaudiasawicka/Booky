import { Link, useNavigate } from "react-router";
import { Bookmark, Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

type NavbarProps = {
  title?: string;
};

export default function Navbar({
  title = "Recenzje & Rekomendacje",
}: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  function handleLogout() {
    navigate("/auth/login");
  }

  return (
    <header className="w-full border-b border-slate-200 bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
            <Bookmark
              size={18}
              className="text-slate-700 dark:text-slate-100"
            />
          </span>
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Zmień motyw"
            title="Zmień motyw"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-slate-200" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>

          <Link
            to="/profileDetails"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Profil"
            title="Profil"
          >
            <User size={20} className="text-slate-700 dark:text-slate-100" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Wyloguj"
            title="Wyloguj"
          >
            <LogOut size={20} className="text-slate-700 dark:text-slate-100" />
          </button>
        </nav>
      </div>
    </header>
  );
}
