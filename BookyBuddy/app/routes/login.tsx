import { Mail, Lock } from "lucide-react";
import { IconInput } from "~/components/IconInput";

function Login() {
  return (
    <>
      <h1>Witaj ponownie!</h1>
      <p>Zaloguj się, aby kontynuować</p>
      <form>
        <IconInput
          icon={<Mail size={18} />}
          type="email"
          placeholder="twoj@email.com"
        />
      </form>
    </>
  );
}

export default Login;
