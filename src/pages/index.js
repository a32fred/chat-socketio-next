import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Introduction() {
  const router = useRouter();
  const [username, setUsername] = useState("");


  if (typeof window !== 'undefined' && localStorage.getItem("token") && localStorage.getItem("username")) {
    router.push("/chat");
  }

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://atzurtrah.a32fred.repl.co/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", username);
        router.push("/chat");

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
          body: JSON.stringify({ username, subscription: pushSubscription }),
        });


      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' &&'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar o Service Worker:', error);
        });
    }
  }, []);

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
