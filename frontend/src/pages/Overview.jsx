import React from "react";
import { ShieldCheck, Image as ImageIcon, Info } from "lucide-react";
import { NavLink } from "react-router-dom";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full text-sm text-blue-700 font-medium">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          System Operational
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-4">
        <Info className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-indigo-900">
            ConsentShield enables verification of AI training consent.
          </h3>
          <p className="text-indigo-800 text-sm mt-1">
            It does not enforce AI behavior. It provides a machine-readable
            signal that ethical AI model trainers can respect.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center mb-4">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Images Registered
          </p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            8,432{" "}
            <span className="text-xs font-normal text-slate-400 ml-1">
              (Demo)
            </span>
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">
            Session Checks
          </p>
          <p className="text-3xl font-bold text-slate-900 mt-1">142</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Recent Activity</h3>
          <NavLink
            to="/registry"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </NavLink>
        </div>
        <div className="divide-y divide-slate-100">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  Consent Verified
                </p>
                <p className="text-xs font-mono text-slate-500 truncate">
                  img_8f7a...3b2x
                </p>
              </div>
              <span className="text-sm text-slate-400">{i * 2}m ago</span>
            </div>
          ))}
          <div className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                New Registration
              </p>
              <p className="text-xs font-mono text-slate-500 truncate">
                img_99c2...11z
              </p>
            </div>
            <span className="text-sm text-slate-400">14m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
