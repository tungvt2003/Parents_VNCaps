import React from "react";
import { useNavigate } from "react-router-dom";

const MedicineList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full items-center justify-center min-h-screen flex flex-col gap-5 p-2 bg-gray-200">
      <button
        className="w-full bg-lime-500 p-3 rounded-lg text-white flex items-center justify-center gap-2"
        onClick={() => navigate("/new-medicine-form")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-plus"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <p className="font-semibold">Dặn thuốc</p>
      </button>
      <div className="bg-white p-2 flex flex-col w-full">
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-bold text-lg">So mui</p>
          <p>(Da tiep nhan)</p>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <p>Uong thuoc</p>
          <p className="font-bold text-lg">26-04-2024 - 29-04-2024</p>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <p className="font-bold text-lg">1. Muoi</p>
          <span>
            <p className="font-bold">1</p>
            <p>(ml)</p>
          </span>
        </div>
        <div className="flex flex-row w-full justify-between items-center">
          <p>Sang 1 (ml)</p>
          <p>Trua 1 (ml)</p>
          <p>Chieu 1 (ml)</p>
        </div>
        <p className="font-bold">Luu y: Uong truoc khi an</p>
      </div>
    </div>
  );
};

export default MedicineList;
