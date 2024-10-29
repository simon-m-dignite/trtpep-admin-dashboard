import axios from "axios";
import React, { useEffect, useState } from "react";
import productsServices from "../../services/productsServices";
import { BASE_URL } from "../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProducts = () => {
  const [formData, setFormData] = useState([]);
  console.log("products >>", formData);
  const navigate = useNavigate();

  const handleInputChange = (e, therapyIndex, optionIndex, field, type) => {
    const updatedFormData = { ...formData };
    const therapy = updatedFormData.therapies[therapyIndex];
    const option = therapy.options[optionIndex];

    option[field] = type === "checkbox" ? e.target.checked : e.target.value;

    setFormData(updatedFormData);
  };

  const handleLabInputChange = (e, labIndex, optionIndex, field, type) => {
    const updatedFormData = { ...formData };
    const lab = updatedFormData.labWork[labIndex];
    const option = lab.options[optionIndex];

    option[field] = type === "checkbox" ? e.target.checked : e.target.value;

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("updated form data >>", formData);
    try {
      const res = await fetch(
        `${BASE_URL}/products/update-products/${formData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            therapies: formData.therapies,
            labWork: formData.labWork,
          }),
        }
      );
      console.log("update products res >>", res);
      toast.success("Products updated ");
      navigate("/products");
    } catch (error) {
      console.log("update product err >>", error);
      toast.error("An error occurred while updating products");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await productsServices.fetchProducts();
      setFormData(res.products[0]);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full bg-white p-6 rounded-xl mt-6 min-h-screen">
      <form onSubmit={handleSubmit}>
        {formData?.therapies?.map((therapy, therapyIndex) => (
          <div key={therapy._id} className="therapy-section mb-10">
            <h4 className="font-semibold mb-4 text-red-500">{therapy.name}</h4>
            {therapy?.options?.map((option, optionIndex) => (
              <div key={option._id} className="therapy-option mb-3">
                <p className="font-semibold mb-2">
                  {optionIndex + 1}. {option?.name}
                </p>
                <div className="w-full grid grid-cols-4 gap-5 mb-5">
                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Total Price:</label>
                    <input
                      type="number"
                      value={option.totalPrice}
                      className="border outline-none p-2 rounded-lg"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          therapyIndex,
                          optionIndex,
                          "totalPrice",
                          "number"
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Price Per Month:</label>
                    <input
                      type="number"
                      value={option.pricePerMonth}
                      className="border outline-none p-2 rounded-lg"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          therapyIndex,
                          optionIndex,
                          "pricePerMonth",
                          "number"
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-medium">Supply Duration:</label>
                    <input
                      type="text"
                      className="border outline-none p-2 rounded-lg"
                      value={option.supplyDuration}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          therapyIndex,
                          optionIndex,
                          "supplyDuration",
                          "text"
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="font-medium">Available in stock:</label>
                    <input
                      type="checkbox"
                      checked={option.isInStock}
                      className="w-4 h-4"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          therapyIndex,
                          optionIndex,
                          "isInStock",
                          "checkbox"
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {formData?.labWork?.map((lab, labIndex) => (
          <div key={lab._id} className="lab-section">
            <h4 className="font-semibold text-lg mb-3">{lab.name}</h4>
            {lab?.options?.map((option, optionIndex) => {
              return option?.name == "N/A" ? (
                <></>
              ) : (
                <>
                  <div key={option._id} className="mb-6">
                    <p className="font-semibold mb-1">
                      {optionIndex + 1}. {option.name}
                    </p>
                    {/* <label>
                  Option Name:
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) =>
                      handleLabInputChange(
                        e,
                        labIndex,
                        optionIndex,
                        "name",
                        "text"
                      )
                    }
                  />
                </label> */}
                    <div className="w-full grid grid-cols-4 gap-6">
                      <div className="flex flex-col gap-1">
                        <label className="font-medium">Total Price:</label>
                        <input
                          type="number"
                          value={option.totalPrice}
                          className="border p-2 outline-none rounded-lg"
                          onChange={(e) =>
                            handleLabInputChange(
                              e,
                              labIndex,
                              optionIndex,
                              "totalPrice",
                              "number"
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label>Price Per Month:</label>
                        <input
                          type="number"
                          className="border p-2 outline-none rounded-lg"
                          value={option.pricePerMonth}
                          onChange={(e) =>
                            handleLabInputChange(
                              e,
                              labIndex,
                              optionIndex,
                              "pricePerMonth",
                              "number"
                            )
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label>Supply Duration:</label>
                        <input
                          type="text"
                          className="border p-2 outline-none rounded-lg"
                          value={option.supplyDuration}
                          onChange={(e) =>
                            handleLabInputChange(
                              e,
                              labIndex,
                              optionIndex,
                              "supplyDuration",
                              "text"
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="font-medium">
                          Available in stock:
                        </label>
                        <input
                          type="checkbox"
                          checked={option.isInStock}
                          className="w-4 h-4"
                          onChange={(e) =>
                            handleLabInputChange(
                              e,
                              labIndex,
                              optionIndex,
                              "isInStock",
                              "checkbox"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ))}

        <div className="mt-6 flex items-center gap-4 justify-end">
          <button
            type="submit"
            className="bg-gray-400 px-4 py-2.5 text-sm rounded-lg text-white font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 px-4 py-2.5 text-sm rounded-lg text-white font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProducts;
