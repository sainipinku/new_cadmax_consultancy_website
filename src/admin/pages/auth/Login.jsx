import { useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../../assets/Images/Other/Accuracy.jpg";
import API from "../../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/admin/auth/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("isAdminAuth", "true");

      navigate("/admin", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <form
        onSubmit={handleLogin}
        className="relative z-10 w-96 p-8 rounded-2xl
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-3 text-center text-white">
          Cadmax Consultancy
        </h3>

        <p className="font-bold mb-6 text-center text-white">
          Login to your Account
        </p>

        {error && (
          <div className="mb-4 p-2 bg-red-500/80 text-white rounded text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded
                     bg-white/20 text-white placeholder-white/70
                     border border-white/30 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded
                     bg-white/20 text-white placeholder-white/70
                     border border-white/30 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded font-semibold
                     bg-white text-slate-900 hover:bg-slate-200 transition
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mb-6 text-right pt-3 cursor-pointer text-white">
          forgot password ?
        </p>
      </form>
    </div>
  );
};

export default Login;
