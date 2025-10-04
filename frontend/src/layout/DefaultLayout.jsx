import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
const DefaultLayout = () => {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="dashboard" />
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
