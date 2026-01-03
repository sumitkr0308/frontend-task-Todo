import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      // redirect after successful register
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full mb-4 p-3 border rounded-lg"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
