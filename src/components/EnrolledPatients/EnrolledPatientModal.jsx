import React from "react";

const EnrolledPatientModal = ({ state, onclick }) => {
  return (
    state && (
      <div className="w-full h-screen flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)] fixed top-0 left-0">
        <div className="w-2/5 h-1/2 bg-white rounded-xl p-8">
          <button type="button" className="text-xl" onClick={onclick}>
            x
          </button>
        </div>
      </div>
    )
  );
};

export default EnrolledPatientModal;
