import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo login
    navigate("/overview");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">ConsentShield</h1>
        </div>
        <p className="text-slate-500 mb-8">AI training consent registry</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-900">
                Password
              </label>
              <a
                href="#"
                className="text-sm font-medium text-blue-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value="password123"
                onChange={() => {}}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans text-slate-900 tracking-widest"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="keep"
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="keep" className="text-sm text-slate-600">
              Keep me signed in
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98]"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Need verification access?{" "}
            <span className="font-semibold text-slate-700">
              Contact Support
            </span>
          </p>
        </div>
        <div className="mt-2 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            Create an account
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-xs text-slate-400 text-center max-w-md px-4 leading-relaxed">
        ConsentShield provides consent verification, not enforcement.
      </div>
    </div>
  );
};

export default Login;
