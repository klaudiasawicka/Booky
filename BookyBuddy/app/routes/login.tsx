import { useNavigate, Link, useLocation } from "react-router";
import { Mail, Lock } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";
import { useState, useEffect } from "react";
import { fetchClient } from "~/services/api";
import * as Toast from "@radix-ui/react-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Hasło jest za krótkie"),
});

type LoginForm = z.infer<typeof LoginSchema>;

// Schemat odpowiedzi z backendu
const LoginResponseSchema = z.union([
  z.string().min(1), // backend zwraca token jako string
]);

function Login() {
  const navigate = useNavigate();
  const location = useLocation(); // dostajemy lokalizacje

  const [successToastOpen, setSuccessToastOpen] = useState(
    !!location.state?.registrationSuccess,
  );
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const data = await fetchClient("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });
      const parsed = LoginResponseSchema.safeParse(data);
      const token =
        typeof parsed.data === "string" ? parsed.data : parsed.data.token;

      localStorage.setItem("token", token);
      navigate("/welcome");
    } catch (error) {
      console.error("Błąd logowania:", error);
      setErrorToastOpen(true);
    }
  };

  useEffect(() => {
    if (location.state?.registrationSuccess) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  return (
    <Toast.Provider swipeDirection="right">
      <div className="space-y-4">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="text-sm font-medium">Adres email</label>
            <IconInput
              icon={<Mail size={18} />}
              type="email"
              placeholder="twoj@email.com"
              {...register("email")}
            />
            <label className="text-sm font-medium">Hasło</label>
            <IconInput
              icon={<Lock size={18} />}
              type="password"
              placeholder="••••••••"
              {...register("password")}
            />
            <div>
              {" "}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
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
      <Toast.Root
        open={successToastOpen}
        onOpenChange={setSuccessToastOpen}
        className="fixed bottom-4 right-4 w-[360px] rounded-lg border border-green-200 bg-white p-4 shadow-lg animate-in fade-in slide-in-from-right-5"
      >
        <Toast.Title className="font-medium text-green-700">
          Sukces!
        </Toast.Title>
        <Toast.Description className="text-sm text-slate-600">
          Konto zostało utworzone. Możesz się teraz zalogować.
        </Toast.Description>
      </Toast.Root>

      {/* ---  BŁĄD LOGOWANIA --- */}
      <Toast.Root
        open={errorToastOpen}
        onOpenChange={setErrorToastOpen}
        className="fixed bottom-4 right-4 w-[360px] rounded-lg border border-red-200 bg-white p-4 shadow-lg animate-in fade-in slide-in-from-right-5"
      >
        <Toast.Title className="font-medium text-red-700">Błąd</Toast.Title>
        <Toast.Description className="text-sm text-slate-600">
          Niepoprawny e-mail lub hasło.
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2 outline-none" />
    </Toast.Provider>
  );
}

export default Login;
