import { useNavigate } from "react-router-dom";
import { useState } from "react";
import img from "../../../assets/Images/Other/Accuracy.jpg";
import API from "../../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      const res = await API.post("/admin/login", {
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

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 rounded
                       bg-white/20 text-white placeholder-white/70
                       border border-white/30 focus:outline-none pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/70 hover:text-black focus:outline-none"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

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
