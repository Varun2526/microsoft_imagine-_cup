import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Upload,
  ScanLine,
  Database,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import DisclaimerBanner from "../components/DisclaimerBanner";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, clear tokens. Here just redirect.
    navigate("/login");
  };

  const navItems = [
    { to: "/overview", label: "Overview", icon: LayoutDashboard },
    { to: "/register-consent", label: "Register Consent", icon: Upload },
    { to: "/verify", label: "Verify", icon: ScanLine },
    { to: "/registry", label: "Registry", icon: Database },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <DisclaimerBanner />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
          <div className="p-6 flex items-center gap-2 border-b border-slate-100">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              ConsentShield
            </span>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Mobile Header & Sidebar */}
        <div className="md:hidden flex flex-col w-full h-full">
          <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                ConsentShield
              </span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </header>

          {isMobileMenuOpen && (
            <div className="bg-white border-b border-slate-200 p-4 absolute top-16 left-0 right-0 z-50 shadow-xl">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `
                            flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                            ${
                              isActive
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }
                            `}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </nav>
            </div>
          )}

          <main className="flex-1 overflow-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Main Content - Desktop */}
        <main className="hidden md:block flex-1 overflow-auto bg-slate-50 p-8">
          <div className="max-w-5xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
