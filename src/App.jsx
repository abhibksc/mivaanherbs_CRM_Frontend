import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<ManageOrders />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/active-users" element={<ActiveUsers />} />
          <Route path="/email-unverified" element={<UnverifiedEmails />} />
          <Route path="/mobile-unverified" element={<UnverifiedMobiles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
