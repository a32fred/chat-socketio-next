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
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="max-w-md p-8 bg-gray-800 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Chat App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Digite seu nome"
            className="bg-slate-800 p-2 rounded-lg w-full mb-4"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
          >
            Entrar no Chat
          </button>
        </form>
      </div>
    </div>
  );
}