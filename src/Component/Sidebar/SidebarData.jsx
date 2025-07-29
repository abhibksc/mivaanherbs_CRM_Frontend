import { MdContactPage } from "react-icons/md";
import { FaCartPlus, FaUsers, FaHome, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

export const SidebarData = [
  { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
  { title: "Total Users", icon: <FaUsers />, path: "/users?filter=all" },
  { title: "Total Income", icon: <FaMoneyCheckAlt />, path: "/total-income" },
  { title: "Income Summary", icon: <FaChartBar />, path: "/income-summary" },
  { title: "Recent Signups", icon: <FaUsers />, path: "/recent-signups" },
  { title: "Top Earners", icon: <FaUsers />, path: "/top-earners" },
  { title: "BV Stats", icon: <FaChartBar />, path: "/bv-stats" },
  { title: "All Transactions", icon: <FaCartPlus />, path: "/all-transactions" },
  { title: "Recent Transactions", icon: <FaCartPlus />, path: "/recent-transactions" },
  { title: "Transaction Stats", icon: <FaChartBar />, path: "/transaction-stats" },
];
