import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value="Jane Doe"
              disabled
              className="w-full max-w-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value="jane@example.com"
              disabled
              className="w-full max-w-sm px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          API Access
        </h3>
        <p className="text-sm text-slate-500 mb-4">
          Use this key to access the ConsentShield Registry API
          programmatically.
        </p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Public API Key (Demo)
          </label>
          <div className="flex max-w-md">
            <input
              type="text"
              value="pk_demo_99a82b7c4d1e5f"
              readOnly
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-l-lg font-mono text-sm text-slate-600"
            />
            <button className="px-4 py-2 bg-slate-100 border border-l-0 border-slate-200 rounded-r-lg text-slate-600 hover:bg-slate-200 font-medium text-sm">
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Settings;
