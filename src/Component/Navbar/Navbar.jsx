import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { TbSettingsPin } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import "./Navbar.css";

function Navbar({setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <h1>Mivaan</h1>
          <p>Hearbs Pvt .Ltd</p>
        </div>
        <div className="search">
          <label>
            <LiaSearchSolid />
          </label>
          <input type="text" placeholder="Search Here..." />
        </div>
      </div>

       <ul className="nav-icons">
        <li onClick={handleLogout} title="Logout" style={{ cursor: "pointer" }}>
          <IoMdLogOut />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
