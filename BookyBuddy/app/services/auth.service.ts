import {fetchClient} from "~/services/api";
import type {LoginRequest, RegisterRequest} from "./../types/auth";

const AuthService = {
  login: async (credentials: LoginRequest): Promise<string> => {
    const token = await fetchClient("/auth/login", {
      method: "POST",
       body: JSON.stringify(credentials),
    });

    localStorage.setItem("token", token);
    return token;
  },

  register: async (data: RegisterRequest): Promise<string> => {
    return  await fetchClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout: () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }
};

export default AuthService;
