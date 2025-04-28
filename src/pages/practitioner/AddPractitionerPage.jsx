import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { addNewPractitioner } from "../../services/practitionerServices";

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

const AddPractitionerPage = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  // In your form:

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || title.trim() === "") {
      toast.error("Title is required");
      return;
    }

    if (!content || content.trim() === "") {
      toast.error("Content is required");
      return;
    }

    try {
      const res = await addNewPractitioner(content, title);
      console.log("create practitioner res >> ", res);
      toast.success("practitioner added successfully");
      navigate("/practitioner");
    } catch (error) {
      console.log("create practitioner error >> ", error);
      toast.error("An error occurred while adding practitioner");
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center justify-start gap-3 mb-6">
          <Link to="/practitioner">
            <FaArrowLeft className="text-2xl" />
          </Link>
          <h2 className="text-xl font-semibold">Add New Practitioner</h2>
        </div>
      </div>
 
      <div className="w-full bg-white p-6 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-6 rounded-xl min-h-screen"
        >
          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Practitioner Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg bg-white p-3 text-sm w-full outline-red-500 text-gray-700"
            />
          </div>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            style={{ height: "600px" }}
          />
          <div className="w-full mt-16">
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-3 rounded-lg text-sm font-medium"
            >
              Add Practitioner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPractitionerPage;
