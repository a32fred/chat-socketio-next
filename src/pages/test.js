import { useState, useEffect } from 'react';

function Profile() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem('token');
      const res = await fetch('https://auth-socketio.frederico-carlo.repl.co/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
      } else {
        console.log('Erro ao verificar token');
      }
    }

    verifyToken();
  }, []);

  return (
    <div>
      <h1>Seu nome de usuário é: {username}</h1>
    </div>
  );
}

export default Profile;
