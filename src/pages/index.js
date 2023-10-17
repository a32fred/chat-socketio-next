import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Introduction() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Verifica se o nome do usuário já está no localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      router.push("/chat");
    }
  }, [router]);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    router.push("/chat");
  };

  return (
    <div>
      <h1>Bem-vindo ao Chat App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Digite seu nome"
        />
        <button type="submit">Entrar no Chat</button>
      </form>
    </div>
  );
}