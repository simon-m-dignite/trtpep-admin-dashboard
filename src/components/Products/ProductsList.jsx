import React, { useEffect, useState } from "react";
import productsServices from "../../services/productsServices";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState(null);
  // console.log("Products products >>", products);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productsServices.fetchProducts();
      // console.log("products >> ", res);
      setProducts(res.products[0]);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Therapies:</h2>
        <Link
          to="/products/update-pricing"
          className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          Update Pricing
        </Link>
      </div>
      {products?.therapies.map((product, index) => {
        return (
          <div key={index} className="mb-5 mt-3">
            <h3 className="font-medium mb-2">{product?.name}</h3>
            {product?.options?.map((opt, index) => {
              return (
                <div key={index} className="mb-1">
                  <h4
                    className={`text-sm text-gray-600 ${
                      opt?.isInStock ? "" : "line-through"
                    }`}
                  >
                    {opt.name == "N/A" ? (
                      ""
                    ) : (
                      <>
                        ${opt.totalPrice} -{opt.name} {" ("}
                        {opt.supplyDuration} <span>Month Supply @</span> $
                        {opt.pricePerMonth}/month{")"}
                      </>
                    )}
                  </h4>
                </div>
              );
            })}
          </div>
        );
      })}
      <h2 className="font-semibold text-lg mt-10">Lab Work</h2>
      {products?.labWork.map((product, index) => {
        return (
          <div key={index} className="mb-5 mt-3">
            <h3 className="font-medium mb-2">{product?.name}</h3>
            {product?.options?.map((opt, index) => {
              return (
                <div key={index} className="mb-1">
                  <h4 className="text-sm text-gray-600">
                    {opt.name == "N/A" ? (
                      ""
                    ) : (
                      <>
                        {opt.totalPrice == 0 ? "" : `$${opt.totalPrice} - `}
                        {opt.name}
                      </>
                    )}
                  </h4>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
