import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { configs } from "../configs";
import axios from "axios";
import Redirect from "../components/Navigate/Redirect";
import CustomSpin from "../components/Spin/CustomSpin";
import { Button } from "antd";

export const renderMedicineType = (key) => {
  switch (key) {
    case "pill": {
      return "viên";
    }
    case "liquid": {
      return "ml";
    }
    case "other": {
      return "khác";
    }
    default:
      return key;
  }
};
interface Medicine {
  medicines: [
    {
      name: string;
      type: string;
      morningQuantity: number;
      middayQuantity: number;
      eveningQuantity: number;
    }
  ];
  notes: string;
  dateEnd: string;
  dateStart: string;
  title: string;
  status: boolean;
}

export const RELATIONSHIP_CODE = {
  0: "Mẹ",
  1: "Cha",
  2: "Ông",
  3: "Bà",
};

const InformationAccount = () => {
  const navigate = useNavigate();

  const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const dataParent = localStorage.getItem("parent");
    const userData = dataParent ? JSON.parse(dataParent) : null;
    setUserData(userData);
    console.log(userData, "userData");
  }, []);

  return (
    <div className="w-full items-center min-h-screen flex flex-col gap-4 bg-gray-200">
      <Redirect title="Thông tin cá nhân" goBackTo="/account" />
      <div className="flex flex-col items-start justify-start w-full px-2">
        <button className="border-b border-gray-300 w-full text-left py-5 flex justify-between">
          <p>Tên phụ huynh</p>
          <p>{userData?.name}</p>
        </button>
        <button className="border-b border-gray-300 w-full text-left py-5 flex justify-between">
          <p>Mối quan hệ</p>
          <p>{RELATIONSHIP_CODE[userData?.relationship]}</p>
        </button>
        <button className="border-b border-gray-300 w-full text-left py-5 flex justify-between">
          <p>Email</p>
          <p>{userData?.email}</p>
        </button>
        <button className="border-b border-gray-300 w-full text-left py-5 flex justify-between">
          <p>Số điện thoại</p>
          <p>{userData?.phone}</p>
        </button>
      </div>
    </div>
  );
};

export default InformationAccount;
