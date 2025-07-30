import React, { useEffect, useState } from "react";
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
    { title: "Deposit", value: deposits, icon: <FaDollarSign />, link: "/transactions?type=deposit" },
    { title: "Withdrawal", value: withdrawals, icon: <FaDollarSign />, link: "/transactions?type=withdrawal" },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-blue-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, link }) => (
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-gray-600 text-sm font-medium">{title}</h2>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="text-blue-600 text-3xl">
        {icon}
      </div>
    </div>
    <div className="flex items-center justify-end mt-4">
      <Link
        to={link}
        className="flex items-center text-sm text-blue-600 hover:underline font-medium"
      >
        View <FaArrowRight className="ml-1" />
      </Link>
    </div>
  </div>
);

export default Dashboard;
