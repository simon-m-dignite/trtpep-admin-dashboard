import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import { fetchPractitionerById, handleDeletePractitioner } from "../../services/practitionerServices";

const PractitionerPage = () => {
  const [practitioner, setPractitioner] = useState("");
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await fetchPractitionerById(_id);
        setPractitioner(res.data);
        // console.log("BlogDetails >> ", res);
      } catch (error) {
        console.log("blogDetails error >> ", error);
      }
    };
    fetchBlogDetails();
  }, []);

  const handleDelete = async () => {
    try {
      alert(_id,"idsss")
      const res = await handleDeletePractitioner(_id);
      // console.log("deleteBlog res >> ", res);
      toast.success(res.message);
      navigate("/practitioner");
    } catch (error) {
      // console.log("handleDelete error >> ", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center justify-start gap-3 mb-6">
          <Link to="/practitioner">
            <FaArrowLeft className="text-2xl" />
          </Link>
          <h2 className="text-xl font-semibold">Practitioner</h2>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link
            to={`/practitioner/update-practitioner/${_id}`}
            className="text-sm font-medium text-white bg-red-500 px-5 py-3 rounded-lg"
          >
            Edit Practitioner
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
            __html: practitioner.content,
          }}
        />
      </div>
    </div>
  );
};

export default PractitionerPage;
