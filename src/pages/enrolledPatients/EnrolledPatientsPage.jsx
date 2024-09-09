import React, { useEffect } from "react";
import EnrolledPatientsList from "../../components/EnrolledPatients/EnrolledPatientsList";

const EnrolledPatientsPage = () => {
  useEffect(() => {
    document.title = "TRTPEP - Enrolled Patients";
  }, []);
  return (
    <div className="w-full p-6 bg-gray-50">
      <h1 className="text-xl font-semibold">Enrolled Patients</h1>
      <EnrolledPatientsList />
    </div>
  );
};

export default EnrolledPatientsPage;
