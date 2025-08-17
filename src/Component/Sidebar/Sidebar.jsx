import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCartPlus,
  FaUsers,
  FaHome,
  FaChartBar,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const sidebarSections = [
  {
    title: "Main",
    items: [{ title: "Dashboard", icon: <FaHome />, path: "/dashboard" }],
  },
  {
    title: "Manage Users",
    items: [
      { title: "Total Users", icon: <FaUsers />, path: "/users?filter=all" },
      { title: "Activation", icon: <FaUsers />, path: "/activate-user" },
      { title: "Deactivation", icon: <FaUsers />, path: "/Deactivate-user" },
      { title: "Resume", icon: <FaUsers />, path: "/re-activate-user" },



      // { title: "Generate Pin", icon: <FaUsers />, path: "/all-pincodes" },
    ],
  },

  {
    title: "Users Request",
    items: [
      { title: "Fund Request", icon: <FaUsers />, path: "/fund-request" },

    ],
  },

  {
    title: "Manage Income",
    items: [
      {
        title: "Total Income",
        icon: <FaMoneyCheckAlt />,
        path: "/total-income",
      },
    ],
  },

  {
    title: "Manage Deposit",
    items: [
      {
        title: "Total Deposit",
        icon: <FaMoneyCheckAlt />,
        path: "/total-Deposit",
      },
    ],
  },

  {
    title: "Manage Withdrawl",
    items: [
      {
        title: "Total Withdrawl",
        icon: <FaMoneyCheckAlt />,
        path: "/total-Withdrawl",
      },
    ],
  },

  {
    title: "Manage Transactions",
    items: [
      {
        title: "All Transactions",
        icon: <FaCartPlus />,
        path: "/all-transactions",
      },
      {
        title: "Recent Transactions",
        icon: <FaCartPlus />,
        path: "/recent-transactions",
      },
      {
        title: "Transaction Stats",
        icon: <FaChartBar />,
        path: "/transaction-stats",
      },
    ],
  },
  {
    title: "Account",
    items: [{ title: "Logout", icon: <MdLogout />, path: "/login" }],
  },
];

function Sidebar({ closeSidebar }) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState(
    sidebarSections.reduce((acc, section) => {
      acc[section.title] = true; // default expanded
      return acc;
    }, {})
  );

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="h-screen w-60 flex flex-col bg-gradient-to-b from-blue-800 to-green-900 text-white shadow-lg">
      {/* Fixed Header */}
      <div className="p-6 text-center border-b border-green-700 flex-shrink-0">
        <h2 className="text-2xl font-bold">Mivaan</h2>
        <p className="text-xs text-green-300 mt-1">Herbs Pvt. Ltd</p>
      </div>

      {/* Scrollable Navigation */}
      <nav className="flex-1 overflow-y-auto mt-4 pr-1">
        {sidebarSections.map((section, i) => (
          <div key={i} className="mb-2">
            <button
              className="flex justify-between items-center w-full px-5 py-2 text-xs uppercase tracking-wider text-green-300 hover:text-white transition-colors"
              onClick={() => toggleSection(section.title)}
            >
              <span>{section.title}</span>
              {openSections[section.title] ? (
                <FaChevronDown className="text-green-300" />
              ) : (
                <FaChevronRight className="text-green-300" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openSections[section.title] ? "block" : "hidden"
              }`}
            >
              {section.items.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) closeSidebar?.();
                    }}
                    className={`flex items-center gap-3 px-6 py-2 text-sm transition-all
                      ${
                        isActive
                          ? "bg-green-700 text-white font-semibold shadow-inner"
                          : "hover:bg-green-700 hover:text-white text-green-200"
                      }`}
                  >
                    <div className="text-lg">{item.icon}</div>
                    <span className="truncate">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}


export default Sidebar;
