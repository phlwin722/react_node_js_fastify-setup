import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import MainLayout from "../layout/MainLayout";
import Default from "../pages/Default/Default";
import Notfound from "../Notfound";
import Dashboard from "../pages/Main/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/signin" />,
      },
      {
        path: "/signin",
        element: <Default />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
