import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import blogServices from "../../services/blogServices";
import Quill from "quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

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

const AddBlogPage = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = blogServices.addNewBlog(content);
      console.log("create blog res >> ", res);
      toast.success("Blog added successfully");
      navigate("/blogs");
    } catch (error) {
      console.log("create blog error >> ", error);
      toast.error("An error occurred while adding blog");
    }
  };
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center justify-start gap-3 mb-6">
          <Link to="/blogs">
            <FaArrowLeft className="text-2xl" />
          </Link>
          <h2 className="text-xl font-semibold">Add New Blog</h2>
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
              placeholder="Blog Title"
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
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
