import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Importing React Quill
import "react-quill/dist/quill.snow.css"; // Import the Quill stylesheet
// import {
//   createPolicy,
//   updatePolicy,
//   getPolicyById,
// } from "../services/policyService";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    ["link", "image"],
    ["clean"],
  ],
};

const PolicyForm = ({ policyId }) => {
  const [policyData, setPolicyData] = useState({ title: "", content: [] });

  useEffect(() => {
    if (policyId) {
      getPolicyById(policyId).then((res) => setPolicyData(res.data));
    }
  }, [policyId]);

  const handleTitleChange = (e) => {
    setPolicyData({ ...policyData, title: e.target.value });
  };

  const handleParagraphChange = (content, index) => {
    const updatedContent = [...policyData.content];
    updatedContent[index].paragraph = content;
    setPolicyData({ ...policyData, content: updatedContent });
  };

  const handleHeadingChange = (e, index) => {
    const { value } = e.target;
    const updatedContent = [...policyData.content];
    updatedContent[index].heading = value;
    setPolicyData({ ...policyData, content: updatedContent });
  };

  const addSection = () => {
    setPolicyData({
      ...policyData,
      content: [
        ...policyData.content,
        { heading: "", paragraph: "", list: [] },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("policies >> ", policyData);
    try {
      const res = await fetch(
        "http://localhost:8000/api/policy/update-privacy-policy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(policyData),
        }
      );

      const data = res.json();
      console.log("policy res data >> ", data);
    } catch (error) {
      console.log("policy error >> ", error);
    }
    // if (policyId) {
    //   updatePolicy(policyId, policyData).then(() => alert("Policy updated!"));
    // } else {
    //   createPolicy(policyData).then(() => alert("Policy created!"));
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col gap-5">
      <input
        type="text"
        name="title"
        value={policyData.title}
        onChange={handleTitleChange}
        placeholder="Policy Title"
        required
        className="border w-full p-3 rounded-lg outline-none"
      />

      {policyData.content.map((section, index) => (
        <div key={index} className="flex flex-col gap-5 my-5">
          <input
            type="text"
            name="heading"
            value={section.heading}
            onChange={(e) => handleHeadingChange(e, index)}
            placeholder="Heading"
            className="border w-full p-3 rounded-lg outline-none"
          />

          <ReactQuill
            value={section.paragraph}
            onChange={(content) => handleParagraphChange(content, index)}
            placeholder="Paragraph"
            theme="snow"
            className="h-40 block"
          />
        </div>
      ))}

      <div className="w-full flex justify-end gap-4 mt-5">
        <button
          type="button"
          onClick={addSection}
          className="px-5 py-3 bg-red-500 text-white rounded-lg text-sm font-medium"
        >
          Add Section
        </button>
        <button
          type="submit"
          className="px-5 py-3 bg-red-500 text-white rounded-lg text-sm font-medium"
        >
          Save Policy
        </button>
      </div>
    </form>
  );
};

export default PolicyForm;
