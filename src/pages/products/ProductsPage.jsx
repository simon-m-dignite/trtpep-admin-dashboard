import React from "react";
import ProductsList from "../../components/Products/ProductsList";

const ProductsPage = () => {
  return (
    <div className="w-full p-6 bg-gray-50">
      <h1 className="text-xl font-semibold">Products</h1>
      <ProductsList />
    </div>
  );
};

export default ProductsPage;
