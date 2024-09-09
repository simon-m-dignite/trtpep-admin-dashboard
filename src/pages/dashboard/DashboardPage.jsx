import React, { useEffect, useState } from "react";
import BookingList from "../../components/Dashboard/BookingList";
import patientServices from "../../services/patientServices";
import labServices from "../../services/labServices";
import { FaUsers } from "react-icons/fa";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";

const DashboardPage = () => {
  const [newPatients, setNewPatients] = useState([]);
  const [labOrders, setLabOrders] = useState([]);
  const [enrolledPatients, setEnrolledPatients] = useState([]);

  useEffect(() => {
    document.title = "TRTPEP - Dashboard";
    const fetchData = async () => {
      const patient_data = await patientServices.fetchPatients();
      const labOrders = await labServices.fetchLabOrders();
      const patients = await patientServices.fetchEnrolledPatients();
      // console.log("enrolledPatients >> ", patients.data);
      setNewPatients(patient_data.patients);
      setLabOrders(labOrders.labOrders);
      setEnrolledPatients(patients.data);
    };

    fetchData();
  }, []);
  return (
    <div className="w-full bg-gray-50 p-6 min-h-screen">
      <h1 className="font-semibold text-xl">Dashboard</h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <div className="rounded-[18px] bg-white p-6 flex items-center justify-start gap-3">
          <div className="w-[64px] h-[64px] rounded-[18px] bg-red-50 flex items-center justify-center p-3.5">
            <FaUsers className="text-[#ef4444]/90 w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {newPatients.length > 0 ? newPatients.length : 0}
            </h2>
            <h2 className="text-sm font-medium secondary-text">New Patients</h2>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 flex items-center justify-start gap-3">
          <div className="w-[64px] h-[64px] rounded-[18px] bg-red-50 flex items-center justify-center p-3.5">
            <HiClipboardDocumentList className="text-[#ef4444]/90 w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {labOrders.length > 0 ? labOrders.length : 0}
            </h2>
            <h2 className="text-sm font-medium secondary-text">Lab Orders</h2>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 flex items-center justify-start gap-3">
          <div className="w-[64px] h-[64px] rounded-[18px] bg-red-50 flex items-center justify-center p-4">
            <FaUserGroup className="text-[#ef4444]/90 w-full h-full" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {enrolledPatients.length > 0 ? enrolledPatients.length : 0}
            </h2>
            <h2 className="text-sm font-medium secondary-text">
              Enrolled Patients
            </h2>
          </div>
        </div>
      </div>

      <BookingList />
    </div>
  );
};

export default DashboardPage;
