import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?
          <Link to="/register" className="text-blue-600 ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
