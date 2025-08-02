import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Contact from "./Pages/Contact/Contact";
import ManageOrders from "./Pages/ManageOrder/ManageOrder";
import AllUsers from "./Pages/AllUser/AllUser";
import ActiveUsers from "./Pages/ActiveUser/ActiveUser";
import UnverifiedEmails from "./Pages/UnverifiedEmail/UnverifiedEmail";
import UnverifiedMobiles from "./Pages/UnverifiedMobile/UnverifiedMobile";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Component/ProtectedRoute";
import UserList from "./Pages/AllUser/UserList";
import GeneratePincode from "./Pages/GeneratePincode";
import AllPincodes from "./Pages/AllPincodes";
import { Menu } from "lucide-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("Admin_token"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("Admin_token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex h-screen overflow-hidden bg-gray-100">
          <ToastContainer />

          {/* Sidebar (Visible for large screens or when open on small screens) */}
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block fixed md:static z-20`}>
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Toggle button */}
            <div className="md:hidden p-4 bg-white shadow-md flex items-center justify-between">
              <button
                className="text-gray-800"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <span className="font-semibold text-lg">Mivaan Herbs Admin</span>
            </div>

            <main className="p-4 sm:p-6 md:p-8 mt-2 md:mt-0">
              <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><ManageOrders /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
                <Route path="/all-users" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
                <Route path="/active-users" element={<ProtectedRoute><ActiveUsers /></ProtectedRoute>} />
                <Route path="/email-unverified" element={<ProtectedRoute><UnverifiedEmails /></ProtectedRoute>} />
                <Route path="/mobile-unverified" element={<ProtectedRoute><UnverifiedMobiles /></ProtectedRoute>} />
                <Route path="/all-pincodes" element={<ProtectedRoute><AllPincodes /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      )}

      {/* Always allow /login route */}
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
