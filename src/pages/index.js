import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Introduction = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    const checkUserToken = async () => {
      // Verifica se o usuário já está autenticado
      const token = localStorage.getItem("token");
      const storedUsername = localStorage.getItem("username");

      if (token && storedUsername) {
        router.push("/chat");
      }
    };

    checkUserToken();
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Registra o Service Worker
      try {
        const registration = navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registrado com sucesso:', registration);
      } catch (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      }
    }
  }, [router]);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://atzurtrah.a32fred.repl.co/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, recipient }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        router.push("/chat");
      } else {
        alert(data.message);
        return;
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
    }

    try {
      const responsePublicKey = await fetch('https://socketio.a32fred.repl.co/key');
      const dataKey = await responsePublicKey.json();

      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: dataKey.publicKey,
      });

      await fetch('https://socketio.a32fred.repl.co/registerFCMToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, recipient, subscription: pushSubscription }),
      });

    } catch (error) {
      console.error("Erro ao registrar FCM Token:", error);
      alert("Você não receberá notificações, ou porque você negou ou porque seu navegador não suporta. Portanto a aplicação não irá funcionar por estar em desenvolvimento e depender das notificações e suporte a webpush");
    }
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
          <input
            type="text"
            value={recipient}
            onChange={handleRecipientChange}
            placeholder="Digite o destinatário"
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

export default Introduction;
