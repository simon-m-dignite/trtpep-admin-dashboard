import React from "react";
import EditProducts from "../../components/Products/EditProducts";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EditProductsPage = () => {
  return (
    <div>
      <div className="w-full p-6 bg-gray-50">
        <div className="w-full flex items-center gap-3">
          <Link to={"/products"}>
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-xl font-semibold">Update Pricing</h1>
        </div>
        <EditProducts />
      </div>
    </div>
  );
};

export default EditProductsPage;
