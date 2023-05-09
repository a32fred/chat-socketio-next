import { AuthContext } from "../context/authContext"
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";


function LoginPage() {

  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const { singIn } = useContext(AuthContext);

  async function handleLogin(data) {
    try {
      await singIn(data)
    } catch (error) {
        if (error) {
            setErrorMessage(error.response.data.msg)
        }
    }
  }


  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(handleLogin)} className="w-1/3">
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            required
            placeholder="username"
            className="w-full px-3 py-2 border rounded bg-slate-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            required
            placeholder="password"
            className="w-full px-3 py-2 border rounded bg-slate-600"
            autoComplete="on"
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
