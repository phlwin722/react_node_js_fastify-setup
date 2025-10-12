import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import MainLayout from "../layout/MainLayout";
import Default from "../pages/Default/Default";
import Notfound from "../Notfound";
import Dashboard from "../pages/Main/Dashboard/Dashboard";
import Register from "../pages/Default/Register";
import ProductForm from "../pages/Main/Product/ProductForm";
import Product from "../pages/Main/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "", element: <Navigate to="signin" /> },
      { path: "signin", element: <Default /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { path: "", element: <Navigate to="dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      {
        path: 'product/form/:id?',
        element: <ProductForm />
      },
      {
        path: 'product/',
        element: <Product />
      },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
