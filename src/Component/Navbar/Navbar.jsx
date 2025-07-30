import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { LiaSearchSolid } from "react-icons/lia";

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg px-6 py-2 flex justify-between items-center">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-wide">Mivaan</h1>
          <p className="text-sm text-[#ccebdc] -mt-1">Herbs Pvt. Ltd</p>
        </div>

      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          title="Logout"
          className="p-2 rounded-full hover:bg-white hover:text-[#157347] transition duration-200"
        >
          <IoMdLogOut size={22} />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
