import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import chargesServices from "../../services/chargesServices";
import UpdatePriceFormModal from "./UpdatePriceFormModal";
import UpdateSchedulerLink from "./UpdateSchedulerLink";

const PricesList = () => {
  const [charges, setCharges] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [priceId, setPriceId] = useState("");
  const [data, setData] = useState(null);
  const [schedulerUrl, setSchedulerUrl] = useState(null);
  const [openSchedulerModal, setOpenSchedulerModal] = useState(false);

  const fetchCharges = async () => {
    try {
      const response = await chargesServices.fetchCharges();
      // console.log("charges >>", response.schedulerUrl[0]);
      setCharges(response?.data);
      setSchedulerUrl(response?.schedulerUrl[0]);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  useEffect(() => {
    document.title = "TRTPEP Dashboard - Prices";
    fetchCharges();
  }, [openModal, openSchedulerModal]);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  const handleOpenSchedulerLinkModal = () => {
    setOpenSchedulerModal(!openSchedulerModal);
  };

  const fetchChargesToUpdate = async (_id) => {
    try {
      handleOpenModal();
      setPriceId(_id);
      const response = await chargesServices.fetchChargesById(_id);
      console.log("charges >>", response?.data);
      setData(response?.data);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  const fetchSchedulerLinkToUpdate = async (_id) => {
    try {
      handleOpenSchedulerLinkModal();
      // const response = await chargesServices.fetchSchedulerLinkById(_id);
      // console.log("charges >>", response?.data);
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  return (
    <div className="w-full rounded-xl p-6 bg-white min-h-screen flex flex-col items-start gap-8">
      <UpdatePriceFormModal
        openModal={openModal}
        onclick={handleOpenModal}
        priceId={priceId}
      />
      <UpdateSchedulerLink
        openSchedulerModal={openSchedulerModal}
        onclick={handleOpenSchedulerLinkModal}
        data={schedulerUrl}
        // priceId={priceId}
      />

      {charges?.map((ch, index) => {
        return (
          <div className="w-full flex items-start justify-between" key={index}>
            <div className="w-full flex flex-col items-start gap-1">
              <h3 className="font-semibold text-base">{ch?.name}</h3>
              <p className="font-medium">${ch?.charges}</p>
            </div>

            <button type="button" onClick={() => fetchChargesToUpdate(ch?._id)}>
              <AiOutlineEdit className="text-2xl text-red-500" />
            </button>

            {/* <Link to={`/prices/update-prices/${ch._id}`}>
              <AiOutlineEdit className="text-2xl text-red-500" />
            </Link> */}
          </div>
        );
      })}

      <div className="w-full flex items-start justify-between">
        <div className="w-full flex flex-col items-start gap-1">
          <h2 className="font-semibold text-base">Scheduler URL</h2>
          <a
            target="_blank"
            href={schedulerUrl?.url}
            className="text-sm text-gray-500"
          >
            {schedulerUrl?.url}
          </a>
        </div>
        <button
          type="button"
          onClick={() => fetchSchedulerLinkToUpdate(schedulerUrl?._id)}
        >
          <AiOutlineEdit className="text-2xl text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default PricesList;
