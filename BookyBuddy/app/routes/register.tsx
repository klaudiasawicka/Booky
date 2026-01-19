import { useNavigate, Link } from "react-router";
import { Mail, Lock, User } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";
import { fetchClient } from "~/services/api";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("USER");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({name: userName,
          email: userEmail,
          password: userPass,
          role: userRole,
        }),
      });
      if (typeof data === "string" && data.length > 0) {
        localStorage.setItem("token", data);
        console.log("Token został zapisany!");
      }
        navigate("/login");
    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Imie i Nazwisko */}
          <label className="text-sm font-medium">Imię i nazwisko</label>
          <IconInput
            icon={<User size={18} />}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Jan Kowalski"
          />
          {/* Email */}
          <label className="text-sm font-medium">Adres email</label>
          <IconInput
            icon={<Mail size={18} />}
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="twoj@email.com"
          />
          {/* Hasło */}
          <label className="text-sm font-medium">Hasło</label>
          <IconInput
            icon={<Lock size={18} />}
            type="password"
            value={userPass}
            onChange={(e) => setUserPass(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full mt-4">
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
