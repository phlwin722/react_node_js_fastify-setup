import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const MainLayout = () => {
  const { token } = useStateContext();

  if (!token) {
    return <Navigate to="/signin" />
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
