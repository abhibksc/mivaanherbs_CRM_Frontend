import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import {
  FaUsers,
  FaUserCheck,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaArrowRight,
  FaDollarSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
  const token = localStorage.getItem("Admin_token");

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [emailUnverified, setEmailUnverified] = useState(0);
  const [mobileUnverified, setMobileUnverified] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [withdrawals, setWithdrawals] = useState(0);
  const [deposits, setDeposits] = useState(0);

  const fetchData = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const [usersRes, activeRes, incomeRes, allUsersRes] = await Promise.all([
        fetch(`${baseUrl}/admin/total-users`, { headers }),
        fetch(`${baseUrl}/admin/active-users`, { headers }),
        fetch(`${baseUrl}/admin/total-income`, { headers }),
        fetch(`${baseUrl}/admin/allusers`, { headers }),
      ]);

      const usersData = usersRes.ok ? await usersRes.json() : {};
      const activeData = activeRes.ok ? await activeRes.json() : {};
      const incomeData = incomeRes.ok ? await incomeRes.json() : {};
      const allUsersData = allUsersRes.ok ? await allUsersRes.json() : {};

      const userList = allUsersData?.data || [];

      setTotalUsers(usersData.totalUsers || 0);
      setActiveUsers(activeData.activeUsers || 0);
      setTotalIncome(incomeData.totalIncome || 0);
      setEmailUnverified(userList.filter(user => !user.isVarified_email).length);
      setMobileUnverified(userList.filter(user => !user.isVarified_mobile).length);

      // Optional/placeholder fields
      setWithdrawals(allUsersData.withdrawals || 0);
      setDeposits(allUsersData.total_package_sell || 0);

    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const cards = [
  { title: "Total Users", value: totalUsers, icon: <FaUsers />, link: "/users?filter=all" },
  { title: "Active Users", value: activeUsers, icon: <FaUserCheck />, link: "/users?filter=active" },
  { title: "Email Unverified", value: emailUnverified, icon: <FaEnvelopeOpenText />, link: "/users?filter=email-unverified" },
  { title: "Mobile Unverified", value: mobileUnverified, icon: <FaPhoneAlt />, link: "/users?filter=mobile-unverified" },
  // { title: "Total Income", value: `₹${totalIncome}`, icon: <FaDollarSign />, link: "/reports?type=income" },
  { title: "Deposit", value: deposits, icon: <FaDollarSign />, link: "/transactions?type=deposit" },
  { title: "Withdrawal", value: withdrawals, icon: <FaDollarSign />, link: "/transactions?type=withdrawal" },
];


  return (
    <div className="dashboard-main">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, link }) => (
  <div className="dashboard-card">
    <div className="card-content">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
    <div className="card-icons">
      <Link to={link}>
        <div className="icon">{icon}</div>
      </Link>
      <Link to={link}>
        <FaArrowRight className="arrow" />
      </Link>
    </div>
  </div>
);

export default Dashboard;
