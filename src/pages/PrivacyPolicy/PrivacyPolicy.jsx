import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import policyServices from "../../services/policyServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    ["link"],
    ["clean"],
  ],
};

const PrivacyPolicy = () => {
  const params = useParams();
  console.log("params >> ", params.type);
  const [policies, setPolicies] = useState();
  console.log("policies >> ", policies);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Privacy Policy");

  useEffect(() => {
    const fetchPolicies = async () => {
      const res = await policyServices.fetchPrivacyPolicy("Privacy Policy");
      console.log("policy res >> ", res.data);
      setPolicies(res.data);
    };
    fetchPolicies();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = policyServices.handleCreatePolicy(
        title,
        value,
        "Privacy Policy"
      );
      console.log("create policy res >> ", res);
    } catch (error) {
      console.log("create policy error >> ", error);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-6">Privacy Policy</h2>
        <Link
          to="/policy/update-privacy-policy"
          className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
        >
          Update Policy
        </Link>
      </div>

      <div className="w-full bg-white p-6 rounded-lg">
        {/* <h1>{policies?.title}</h1> */}
        <div dangerouslySetInnerHTML={{ __html: policies?.content }} />
      </div>

      {/* <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-6 rounded-xl min-h-screen"
      >
        <ReactQuill
          value={value}
          onChange={setValue}
          modules={modules}
          style={{ height: "600px" }}
        />
        <div className="w-full mt-16">
          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-3 rounded-lg text-sm"
          >
            Add
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default PrivacyPolicy;
