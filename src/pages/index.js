import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", username);
    history.push("/chat");
  };

  // Verificar se já existe um usuário no localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    history.push("/chat");
  }

  return (
    <div>
      <h2>Informe seu nome</h2>
      <form onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={handleInputChange} 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
