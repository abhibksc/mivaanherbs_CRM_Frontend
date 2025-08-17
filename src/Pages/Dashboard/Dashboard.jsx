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
  const baseUrl =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
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
      setEmailUnverified(
        userList.filter((user) => !user.isVarified_email).length
      );
      setMobileUnverified(
        userList.filter((user) => !user.isVarified_mobile).length
      );

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
    {
      title: "Total Users",
      value: totalUsers,
      icon: <FaUsers />,
      link: "/users?filter=all",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Active Users",
      value: activeUsers,
      icon: <FaUserCheck />,
      link: "/users?filter=active",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      title: "Email Unverified",
      value: emailUnverified,
      icon: <FaEnvelopeOpenText />,
      link: "/users?filter=email-unverified",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Mobile Unverified",
      value: mobileUnverified,
      icon: <FaPhoneAlt />,
      link: "/users?filter=mobile-unverified",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: "Deposit",
      value: deposits,
      icon: <FaDollarSign />,
      link: "/transactions?type=deposit",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Withdrawal",
      value: withdrawals,
      icon: <FaDollarSign />,
      link: "/transactions?type=withdrawal",
      gradient: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div className="px-6 py-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
        📊 Dashboard
      </h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, link, gradient }) => (
  <div
    className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
  >
    {/* Gradient background */}
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-90`}
    ></div>

    {/* Content */}
    <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium opacity-90">{title}</h2>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="text-5xl opacity-80">{icon}</div>
      </div>

      <div className="flex justify-end mt-6">
        <Link
          to={link}
          className="flex items-center text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition"
        >
          View <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  </div>
);

export default Dashboard;
