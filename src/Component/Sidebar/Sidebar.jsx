import React from "react";
import { SidebarData } from "./SidebarData";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav className="nav-menu">
        {SidebarData.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`nav-link ${isActive ? "active" : ""}`}
            >
              <div className="icon">{item.icon}</div>
              <span className="title">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
