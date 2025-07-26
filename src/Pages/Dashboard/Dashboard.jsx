import React from "react";
import "./Dashboard.css";
import { FaUsers, FaUserCheck, FaEnvelopeOpenText, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {

  const [BackendData, setBackEndData] = useState([]);

  const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

useEffect(() => {
  fetch(`${baseUrl}/allusers`)
    .then((res) => res.json())
    .then((data) => setBackEndData(data));
}, []);
  



  return (
    <div className="dashboard-main">
      <h1>Dashboard</h1>
      <div className="dashboard-cards">

                <div className="dashboard-card">
          <div className="card-content">
            <h2>Withdrawal</h2>
            <p>{BackendData.withdrawals}</p>
          </div>
          <div className="card-icons">
            <Link to="/all-users">
              <FaUsers className="icon" />
            </Link>
            <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>

                 <div className="dashboard-card">
          <div className="card-content">
            <h2>Deposit</h2>
            <p>{BackendData.total_package_sell}</p>
          </div>
          <div className="card-icons">
            <Link to="/all-users">
              <FaUsers className="icon" />
            </Link>
            <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>




        <div className="dashboard-card">
          <div className="card-content">
            <h2>Total Users</h2>
            <p>{BackendData?.data?.length}</p>
          </div>
          <div className="card-icons">
            <Link to="/all-users">
              <FaUsers className="icon" />
            </Link>
            <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Active Users</h2>
            <p>{BackendData?.data?.map((ele) => ele.active)?.length}</p>
          </div>
          <div className="card-icons">
         <Link to="/all-users">
              <FaUserCheck className="icon" />
            </Link>
          <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Email Unverified</h2>
           <p>{BackendData?.data?.map((ele) => !ele.isVarified_email)?.length}</p>
          </div>
          <div className="card-icons">
         <Link to="/all-users">
              <FaEnvelopeOpenText className="icon" />
            </Link>
           <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-content">
            <h2>Mobile Unverified</h2>
             <p>{BackendData?.data?.map((ele) => !ele.isVarified_mobile)?.length}</p>
          </div>
          <div className="card-icons">
      <Link to="/all-users">
              <FaPhoneAlt className="icon" />
            </Link>
             <Link to="/all-users">
              <FaArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
