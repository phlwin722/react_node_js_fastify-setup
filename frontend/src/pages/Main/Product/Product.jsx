import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import axiosClient from "../../../axiosClient";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  // 🧩 Columns must match your backend field names
  const columns = [
    { name: "Name", key: "name" },
    { name: "Description", key: "description" },
    { name: "Created At", key: "created_at" },
  ];

  // 🧠 Fetch product data
  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/items", { withCredentials: true });

      // ⚙️ Your backend returns array directly, not under `data`
      // adjust based on actual structure
      const products = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      if (products) {
        setRows(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
    document.title = "Products - Muibu";
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-gray-700 text-2xl font-semibold">Products</h1>

        {/* 🟢 Add Product button */}
        <button
          onClick={() => navigate("/app/product/form")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {/* 🧾 Table Component */}
      <Table columns={columns} rows={rows} fetchData={fetchData} />
    </div>
  );
};

export default Product;
