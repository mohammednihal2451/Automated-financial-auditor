import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/upload", label: "Upload CSV", icon: Upload },
  { to: "/profile", label: "Profile", icon: User },
];

function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(() => {
    // Persist collapsed state in localStorage
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

 
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <div
      className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out shadow-lg ${
        collapsed ? "w-20" : "w-64"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Brand + Collapse Toggle */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div>
            <span className="text-lg font-bold tracking-tight text-white">
              Audit<span className="text-indigo-400">Flow</span>
            </span>
            <p className="text-xs text-slate-500 mt-0.5">Financial Auditor</p>
          </div>
        )}
        <button
          onClick={toggleCollapse}
          className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white ml-auto"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              } ${collapsed ? "justify-center" : ""}`
            }
            title={collapsed ? item.label : ""}
          >
            <item.icon size={20} strokeWidth={1.8} />
            {!collapsed && <span>{item.label}</span>}
            {/* Tooltip for collapsed mode */}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info + Logout */}
      <div className="border-t border-slate-800 p-3 space-y-3">
        
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={18} strokeWidth={1.8} />
          {!collapsed && <span>Logout</span>}
          {/* Tooltip for collapsed mode */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
              Logout
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;