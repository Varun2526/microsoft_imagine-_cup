import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must acknowledge the system limitations.");
      return;
    }
    navigate("/overview");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center gap-2 mb-6 text-slate-900">
          <div className="p-1.5 bg-blue-100 rounded text-blue-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            ConsentShield
          </span>
        </div>

        <h1 className="text-xl font-bold text-slate-900 mb-6">
          Create your registry account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Work Email
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 12 characters"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans text-slate-900"
                required
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

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div className="flex gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 rounded border-amber-300 text-blue-600 focus:ring-blue-500"
              />

              <label
                htmlFor="agree"
                className="text-sm text-slate-800 font-medium cursor-pointer leading-snug"
              >
                I understand this system{" "}
                <span className="font-bold">does not prevent</span> AI image
                generation or deepfakes.
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/10 transition-all active:scale-[0.98]"
          >
            Create Account →
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center gap-6 text-xs text-slate-400 font-medium">
          <a href="#" className="hover:text-slate-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
