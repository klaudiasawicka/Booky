import { useNavigate, Link } from "react-router";
import { Mail, Lock, User } from "lucide-react";
import { IconInput } from "~/components/IconInput";
import Button from "~/components/ui/Button";
import { fetchClient } from "~/services/api";
import { useState } from "react";
import * as z from "zod";
import * as Toast from "@radix-ui/react-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Hasło jest za krótkie."),
  nameAndSurname: z.string().min(1),
});

type RegisterForm = z.infer<typeof RegisterSchema>;

// Schemat odpowiedzi z backendu
const RegisterResponseSchema = z.union([
  z.string().min(1), // backend zwraca token jako string
]);



function Register() {
  // wykorzystujemy do nawigacji
  const navigate = useNavigate();

  const [toastOpen, setToastOpen] = useState(false);
  const [errorToastOpen, setErrorToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      nameAndSurname: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: RegisterForm) => {
    try {
      const data = await fetchClient("/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const parsed = RegisterResponseSchema.safeParse(data);

      const token =
        typeof parsed.data === "string" ? parsed.data : parsed.data.token;

      localStorage.setItem("token", token);
      // Przesyłamy informację o sukcesie, /login pokaże toast
      navigate("/login", { state: { registrationSuccess: true } });
    } catch (error: any) {
      setErrorToastOpen(true);
    }
  };
  return (
    <Toast.Provider swipeDirection="right">
      <div className="space-y-4">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Imie i Nazwisko */}
            <label className="text-sm font-medium">Imię i nazwisko</label>
            <IconInput
              icon={<User size={18} />}
              placeholder="Jan Kowalski"
              {...register("nameAndSurname")}
            />
            {/* Email */}
            <label className="text-sm font-medium">Adres email</label>
            <IconInput
              icon={<Mail size={18} />}
              type="email"
              placeholder="twoj@email.com"
              {...register("email")}
            />
            {/* Hasło */}
            <label className="text-sm font-medium">Hasło</label>
            <IconInput
              icon={<Lock size={18} />}
              type="password"
              {...register("password")}
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
      <Toast.Root
        open={toastOpen}
        onOpenChange={setToastOpen}
        className="fixed bottom-4 right-4 w-[360px] rounded-lg border bg-white p-4 shadow-lg"
      >
        <Toast.Title className="font-medium">Błąd</Toast.Title>
        <Toast.Description className="mt-1 text-sm text-slate-600">
          Niepowodzenie przy rejestracji
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-50 m-4" />
    </Toast.Provider>
  );
}

export default Register;
