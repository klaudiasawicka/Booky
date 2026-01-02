import { useNavigate, Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div>
        <form className="space-y-4">
          <label className="text-sm font-medium">Email</label>
          <IconInput
            icon={<Mail size={18} />}
            type="email"
            placeholder="twoj@email.com"
          />
          <label className="text-sm font-medium">Password</label>
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
        <Link className="pl-2 text-[var(--nord11)]" to="/register">
          Zarejestruj się
        </Link>
      </p>
    </div>
  );
}

export default Login;
