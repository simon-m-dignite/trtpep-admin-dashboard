import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import blogServices from "../../services/blogServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
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

const UpdateBlogPage = () => {
  const [content, setContent] = useState("");
  const [blog, setBlog] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await blogServices.fetchBlog(_id);
        setBlog(res.data.content);
        // console.log("BlogDetails >> ", res.data);
      } catch (error) {
        // console.log("blogDetails error >> ", error);
      }
    };
    fetchBlogDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await blogServices.handleUpdateBlog(_id, blog);
      console.log("blog >> ", blog);
      console.log("create blog res >> ", res);
      toast.success("Blog Updated");
      navigate("/blogs");
    } catch (error) {
      console.log("create blog error >> ", error);
      toast.error("An error occurred while updating blog");
    }
  };
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-6">Edit Blog</h2>
      </div>

      <div className="w-full bg-white p-6 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-6 rounded-xl min-h-screen"
        >
          <ReactQuill
            value={blog}
            onChange={setBlog}
            modules={modules}
            style={{ height: "600px" }}
          />
          <div className="w-full mt-16 flex items-center justify-end gap-3">
            <Link
              to="/blogs"
              className="bg-red-600 text-white px-10 py-3 rounded-lg text-sm font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-red-600 text-white px-10 py-3 rounded-lg text-sm font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
