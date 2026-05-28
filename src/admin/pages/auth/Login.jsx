import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, LogIn, Building2, Lock, Mail } from "lucide-react";
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
    if (!email || !password) return setError("Please fill all fields");
    try {
      setLoading(true);
      const res = await API.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("isAdminAuth", "true");
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${img})` }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2C59]/80 to-black/60" />

      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-4">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Cadmax Consultancy</h1>
          <p className="text-white/70 mt-2">Admin Panel Login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}
          className="p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          
          {error && (
            <div className="mb-5 p-3 bg-red-500/20 border border-red-500/30 text-red-200 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                <input type="email" placeholder="admin@cadmax.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="text-sm text-white/60 hover:text-white transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold
                hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
                disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/25
                flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Cadmax Consultancy. All rights reserved.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;