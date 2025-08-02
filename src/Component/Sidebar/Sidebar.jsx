import React from "react";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ closeSidebar }) {
  const location = useLocation();

  return (
    <aside className="h-full min-h-screen w-60 bg-gradient-to-b from-blue-800 to-green-900 text-white shadow-lg">
      <div className="p-6 text-center border-b border-green-700">
        <h2 className="text-2xl font-bold">Mivaan</h2>
        <p className="text-xs text-green-300 mt-1">Herbs Pvt. Ltd</p>
      </div>

      <nav className="mt-4">
        {SidebarData.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) closeSidebar();
              }}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-all
                ${isActive
                  ? "bg-green-700 text-white font-semibold shadow-inner"
                  : "hover:bg-green-700 hover:text-white text-green-200"
                }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
