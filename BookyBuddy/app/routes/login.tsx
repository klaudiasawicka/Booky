import { useNavigate, Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";
import { useState, type SetStateAction } from "react";
import { fetchClient } from "~/services/api";

function Login() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const data = await fetchClient("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email: userEmail, password: userPass }),
        });
        console.log("Dane z serwera:", data);
        if (typeof data === "string" && data.length > 0) {
            localStorage.setItem("token", data);
            console.log("Token został zapisany!");
        }
        navigate("/welcome");

    } catch (error) {
      console.error("Błąd logowania:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <form onSubmit={handleLogin} className="space-y-4">
          <label className="text-sm font-medium">Adres email</label>
          <IconInput
            icon={<Mail size={18} />}
            value={userEmail}
            onChange={(e) =>
              setUserEmail(e.target.value)
            }
            type="email"
            placeholder="twoj@email.com"
          />
          <label className="text-sm font-medium">Hasło</label>
          <IconInput
            icon={<Lock size={18} />}
            type="password"
            value={userPass}
            onChange={(e) =>
              setUserPass(e.target.value)
            }
            placeholder="••••••••"
          />
          <Button type="submit" className="w-full mt-4">
            Zaloguj się
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
        Nie masz konta?{" "}
        <Link className="pl-2 text---nord11)" to="/register">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}

export default Login;
