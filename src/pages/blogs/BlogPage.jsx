import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogServices from "../../services/blogServices";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

const BlogPage = () => {
  const [blog, setBlog] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await blogServices.fetchBlog(_id);
        setBlog(res.data);
        // console.log("BlogDetails >> ", res);
      } catch (error) {
        console.log("blogDetails error >> ", error);
      }
    };
    fetchBlogDetails();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await blogServices.handleDeleteBlog(_id);
      // console.log("deleteBlog res >> ", res);
      toast.success(res.message);
      navigate("/blogs");
    } catch (error) {
      // console.log("handleDelete error >> ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center justify-start gap-3 mb-6">
          <Link to="/blogs">
            <FaArrowLeft className="text-2xl" />
          </Link>
          <h2 className="text-xl font-semibold">Blog</h2>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link
            to={`/blogs/update-blog/${_id}`}
            className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
          >
            Edit Blog
          </Link>
          <button
            type="button"
            onClick={() => handleDelete()}
            className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
          >
            Delete Blog
          </button>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-xl">
        <p
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        />
      </div>
    </div>
  );
};

export default BlogPage;
