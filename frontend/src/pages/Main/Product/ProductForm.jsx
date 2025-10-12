import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import toastify from "../../../components/Toastify";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false); 

  // ✅ Controlled inputs for name and description
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // 🧠 Handle input change
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 🧩 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      if (id) {
        console.log("Updating:", id, formData);
        await axiosClient.put(`/items/${id}`, formData, { withCredentials: true });
        toastify("success", "Product updated successfully!");
      } else {
        await axiosClient.post(`/items`, formData, { withCredentials: true });
        toastify("success", "Product created successfully!");
      }
        navigate("/app/product");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        toastify("error", "Something went wrong. Please try again.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Fetch product data for edit mode
  const fetchData = async (realID) => {
    try {
      const response = await axiosClient.get(`/items/${realID}`);

      // ✅ Since the API directly returns product data
      const product = response.data;

      if (product && product.id) {
        setFormData({
          name: product.name,
          description: product.description,
        }); 
      } else {
        navigate("*");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
    document.title = id ? "Update Product - Muibu" : "Create Product - Muibu";
  }, [id]);

  return (
    <div className="bg-white mx-5 my-7 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {id ? "Update Product" : "New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 🧾 Name */}
        <div>
          <label htmlFor="name" className="font-medium text-gray-800">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChangeInput}
            className={`border border-gray-300 rounded-md block w-full px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>

        {/* 🧾 Description */}
        <div>
          <label htmlFor="description" className="font-medium text-gray-800">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChangeInput}
            rows="4"
            className={`border border-gray-300 rounded-md block w-full px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors?.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description[0]}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/app/product")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`text-white px-5 py-2 rounded transition ${
              loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
