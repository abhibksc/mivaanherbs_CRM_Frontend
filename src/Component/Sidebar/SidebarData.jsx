import { MdContactPage } from "react-icons/md";
import { FaCartPlus, FaUsers, FaHome } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    path: "/dashboard",
  },
  {
    title: "Manage Orders",
    icon: <FaCartPlus />,
    path: "/orders",
  },
  {
    title: "Manage Users",
    icon: <FaUsers />,
    path: "/users",
  },
  {
    title: "Contact",
    icon: <MdContactPage />,
    path: "/contact",
  },
];
