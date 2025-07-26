import React from "react";
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <nav className="nav-menu">
        {SidebarData.map((item, index) => (
          <div className="nav-data" key={index}>
            <p>
              <Link to={item.path}>{item.icon}</Link>
            </p>
            <p>
              <Link to={item.path}>{item.title}</Link>
            </p>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
