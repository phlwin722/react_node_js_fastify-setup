import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
const DefaultLayout = () => {
  const { type } = useStateContext();

  if (type) {
    return <Navigate to="app" />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
