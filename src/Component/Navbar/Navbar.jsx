import React from "react";
import { IoMdDownload } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { TbSettingsPin } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";
import "./Navbar.css";

function Navbar() {
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
        <li><IoMdDownload /></li>
        <li><IoIosNotifications /></li>
        <li><TbSettingsPin /></li>
        <li><IoMdLogOut /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
