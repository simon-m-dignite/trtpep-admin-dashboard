import React, { useEffect, useState } from "react";
import blogServices from "../../services/blogServices";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await blogServices.fetchBlogs();
      console.log(res.data);
      setBlogs(res.data);
    };
    getBlogs();
  }, []);

  const extractTitleFromContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const h1Tag = doc.querySelector("h1");
    const firstPTag = doc.querySelector("p");

    if (h1Tag) {
      return h1Tag.textContent || "Untitled Blog";
    } else if (firstPTag) {
      return firstPTag.textContent.substring(0, 100) || "Untitled Blog";
    } else {
      return "Untitled Blog";
    }
  };

  const extractFirstParagraph = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    const pTags = doc.querySelectorAll("p");
    const h1Tag = doc.querySelector("h1");

    for (let i = 0; i < pTags.length; i++) {
      if (pTags[i].textContent.trim()) {
        return pTags[i].textContent.substring(0, 200) + "..." || "No content";
      }
    }

    return h1Tag ? h1Tag.textContent.substring(0, 100) + "..." : "No content";
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl min-h-screen">
      {blogs.map((blog, index) => {
        return (
          <div className="mb-8 block" key={index}>
            <Link to={`/blogs/blog/${blog._id}`}>
              <h2 className="font-semibold text-xl mb-1">
                {extractTitleFromContent(blog.content)}
              </h2>
            </Link>
            <p className="text-sm text-gray-700">
              <span></span>
              {extractFirstParagraph(blog.content)}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default BlogsList;
