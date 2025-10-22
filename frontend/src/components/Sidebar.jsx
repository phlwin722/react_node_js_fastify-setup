import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosClient from "../axiosClient";

const Sidebar = ({ isCollapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("type_user");
      await axiosClient.post("/logout", {}, { withCredentials: true });
      navigate("/signin", { replace: true })

    } catch (error) {
      console.error("Logout failed:", error);
    } 
  };

  return (
    <nav className="flex flex-col h-full">
      <div
        className="p-4 cursor-pointer hover:bg-gray-200"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        {isCollapsed ? "☰" : "Collapse ◀"}
      </div>

      <NavLink
        to="/app/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 hover:bg-gray-200 ${
            isActive ? "bg-gray-300 font-semibold" : ""
          }`
        }
        onClick={() => isCollapsed && setCollapsed(false)}
      >
        <DashboardIcon />
        {!isCollapsed && <span>Dashboard</span>}
      </NavLink>

      <NavLink
        to="/app/product"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 hover:bg-gray-200 ${
            isActive ? "bg-gray-300 font-semibold" : ""
          }`
        }
        onClick={() => isCollapsed && setCollapsed(false)}
      >
        <Inventory2Icon />
        {!isCollapsed && <span>Product</span>}
      </NavLink>

      {/* 🚪 Logout Action */}
      <div
        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 cursor-pointer mt-auto"
        onClick={handleLogout}
      >
        <LogoutIcon />
        {!isCollapsed && <span>Logout</span>}
      </div>
    </nav>
  );
};

export default Sidebar;
