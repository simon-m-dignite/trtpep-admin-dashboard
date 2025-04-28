import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import blogServices from "../../services/blogServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import toast from "react-hot-toast";
import { fetchPractitionerById, handleUpdatePractitioner } from "../../services/practitionerServices";

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

const UpdatePractitioner = () => {
  const [content, setContent] = useState("");
 const [practitioner, setPractitioner] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPractitionerDetails = async () => {
      try {
        const res = await fetchPractitionerById(_id);
        setPractitioner(res.data.content);
        // console.log("BlogDetails >> ", res.data);
      } catch (error) {
        // console.log("blogDetails error >> ", error);
      }
    };
    fetchPractitionerDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await handleUpdatePractitioner(_id, practitioner);
      console.log("blog >> ", practitioner);
      console.log("create practitioner res >> ", res);
      toast.success("practitioner Updated");
      navigate("/practitioner");
    } catch (error) {
      console.log("create practitioner error >> ", error);
      toast.error("An error occurred while updating practitioner");
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
            value={practitioner}
            onChange={setPractitioner}
            modules={modules}
            style={{ height: "600px" }}
          />
          <div className="w-full mt-16 flex items-center justify-end gap-3">
            <Link
              to="/practitioner"
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

export default UpdatePractitioner;
