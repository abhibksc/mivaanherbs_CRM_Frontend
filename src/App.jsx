import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Component/Sidebar/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Contact from "./Pages/Contact/Contact";
import ManageOrders from "./Pages/ManageOrder/ManageOrder";
import ManageUsers from "./Pages/ManageUser/ManageUser";
import AllUsers from "./Pages/AllUser/AllUser";
import ActiveUsers from "./Pages/ActiveUser/ActiveUser";
import UnverifiedEmails from "./Pages/UnverifiedEmail/UnverifiedEmail";
import UnverifiedMobiles from "./Pages/UnverifiedMobile/UnverifiedMobile";
import Login from "./Pages/Auth/Login";
import ProtectedRoute from "./Component/ProtectedRoute";
import UserList from "./Pages/AllUser/UserList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("Admin_token"));

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
          {/* Sidebar */}
          <aside className="w-64  hidden md:block">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <main className="p-4 sm:p-6 md:p-8">
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
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
