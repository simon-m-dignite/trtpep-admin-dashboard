import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import toast from "react-hot-toast";
import { fetchPharmaciesById, handleUpdatePharmacies } from "../../services/pharmacies";

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

const UpdatePharmacies = () => {
  const [content, setContent] = useState("");
 const [pharmacies, setPharmacies] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmaciesDetails = async () => {
      try {
        const res = await fetchPharmaciesById(_id);
        setPharmacies(res.data.content);
        // console.log("BlogDetails >> ", res.data);
      } catch (error) {
        // console.log("blogDetails error >> ", error);
      }
    };
    fetchPharmaciesDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleUpdatePharmacies(_id, pharmacies);
      console.log("blog >> ", pharmacies);
      console.log("create pharmacies res >> ", res);
      toast.success("pharmacies Updated");
      navigate("/pharmacies");
    } catch (error) {
      console.log("create pharmacies error >> ", error);
      toast.error("An error occurred while updating pharmacies");
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
            value={pharmacies}
            onChange={setPharmacies}
            modules={modules}
            style={{ height: "600px" }}
          />
          <div className="w-full mt-16 flex items-center justify-end gap-3">
            <Link
              to="/pharmacies"
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

export default UpdatePharmacies;
