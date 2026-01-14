export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function fetchClient(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  if (!response.ok) {
    let errorMessage = `Błąd: ${response.status}`;
    try {
      const errorData = JSON.parse(text);
      if (errorData.message) errorMessage = errorData.message;
    } catch {
      if (text) errorMessage = text;
    }
    throw new Error(errorMessage);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
