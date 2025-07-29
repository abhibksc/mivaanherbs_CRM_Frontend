import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
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
import "./App.css";
import UserList from "./Pages/AllUser/UserList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("Admin_token"));

  // Listen to login/logout changes from anywhere in app
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
        <div className="app-container">
          <div className="navbar">
            <Navbar setIsAuthenticated={setIsAuthenticated} />
          </div>

          <div className="sidebar-content">
            <div className="sidebar">
              <Sidebar />
            </div>

            <main className="main-content">
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


                {/* <Route path="/total-users" element={<ProtectedRoute><TotalUsers /></ProtectedRoute>} />
<Route path="/income-summary" element={<ProtectedRoute><IncomeSummary /></ProtectedRoute>} />
<Route path="/active-users" element={<ProtectedRoute><ActiveUsers /></ProtectedRoute>} />
<Route path="/total-income" element={<ProtectedRoute><TotalIncome /></ProtectedRoute>} />
<Route path="/recent-signups" element={<ProtectedRoute><RecentSignups /></ProtectedRoute>} />
<Route path="/top-earners" element={<ProtectedRoute><TopEarners /></ProtectedRoute>} />
<Route path="/bv-stats" element={<ProtectedRoute><BVStats /></ProtectedRoute>} />
<Route path="/all-transactions" element={<ProtectedRoute><AllTransactions /></ProtectedRoute>} />
<Route path="/recent-transactions" element={<ProtectedRoute><RecentTransactions /></ProtectedRoute>} />
<Route path="/transaction-stats" element={<ProtectedRoute><TransactionStats /></ProtectedRoute>} /> */}



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
