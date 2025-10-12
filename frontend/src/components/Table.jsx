import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axiosClient";

const Table = ({ columns, rows, fetchData }) => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/app/product/form/${id}`); // ✅ fixed
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axiosClient.delete(`/items/${id}`, { withCredentials: true });
      fetchData(); // Refresh data after deletion 
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting.");
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-2 text-gray-600 font-semibold border-b"
              >
                {col.name}
              </th>
            ))}
            <th className="px-4 py-2 text-gray-600 font-semibold border-b text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 border-b text-gray-700"
                  >
                    {col.key === "image" ? (
                      <img
                        src={row[col.key]}
                        alt="Item"
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      row[col.key]
                    )}
                  </td>
                ))}
                <td className="px-4 py-2 border-b text-center">
                  <button
                    onClick={() => handleEdit(row.id)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
