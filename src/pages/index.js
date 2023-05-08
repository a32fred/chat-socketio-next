import { useState } from "react";
import Router from "next/router";
import axios from "../pages/api/axios_api"


function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");



  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/login", {
        username: username,
        password: password,
      });
      localStorage.setItem('token', data.token);
      Router.push('/chat');
    } catch (error) {
      if (erro) {
        setErrorMessage(error.response.data.message);
      }
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="w-1/3">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded bg-slate-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded bg-slate-600"
            value={password}
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
