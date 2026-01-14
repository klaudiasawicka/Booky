import { useNavigate, Link } from "react-router";
import { Mail, Lock, User } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";

function Register() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <form className="space-y-4">
          {/* Imie i Nazwisko */}
          <label className="text-sm font-medium">Imię i nazwisko</label>
          <IconInput
            icon={<User size={18} />}
            type="text"
            placeholder="Jan Kowalski"
          />
          {/* Email */}
          <label className="text-sm font-medium">Adres email</label>
          <IconInput
            icon={<Mail size={18} />}
            type="email"
            placeholder="twoj@email.com"
          />
          {/* Hasło */}
          <label className="text-sm font-medium">Hasło</label>
          <IconInput
            icon={<Lock size={18} />}
            type="password"
            placeholder="••••••••"
          />
          <Button
            type="button"
            className="w-full mt-4"
            onClick={() => navigate("../welcome")}
          >
            Zarejestruj się
          </Button>
        </form>
      </div>
      {/* Linia lub linia */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-sm text-slate-500">lub</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <p className="flex justify-center items-center">
        Masz już konto?{" "}
        <Link className="pl-2 text-(--nord11)" to="/login">
          Zaloguj się
        </Link>
      </p>
    </div>
  );
}

export default Register;
