import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogsList from "../../components/Blogs/BlogsList";

const BlogsPage = () => {
  useEffect(() => {
    document.title = "Blogs";
  }, []);
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold mb-6">Blogs</h2>
        <Link
          to="/blogs/add-new-blog"
          className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
        >
          Add Blog
        </Link>
      </div>

      <BlogsList />
    </div>
  );
};

export default BlogsPage;
