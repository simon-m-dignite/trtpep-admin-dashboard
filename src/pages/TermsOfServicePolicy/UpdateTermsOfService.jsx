import React, { useEffect, useState } from "react";
import policyServices from "../../services/policyServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["link", "image"],
    ["clean"],
  ],
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

const UpdateTermsOfService = () => {
  const [policies, setPolicies] = useState(null);
  const [data, setData] = useState("");
  console.log(policies?.title);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await policyServices.fetchPrivacyPolicy("Terms of Service");
        setPolicies(res.data);
        setData(res.data.content);
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };
    fetchPolicies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await policyServices.handleUpdatePolicy(
        "Terms of Service",
        policies.title,
        data
      );
      console.log("Policy update response >> ", res);
    } catch (error) {
      console.error("Policy update error >> ", error);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Update Policy</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-xl min-h-screen"
      >
        <ReactQuill
          value={data}
          onChange={setData}
          modules={modules}
          style={{ height: "600px" }}
        />
        <div className="w-full mt-16">
          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-3 rounded-lg text-sm"
          >
            Update Policy
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTermsOfService;
