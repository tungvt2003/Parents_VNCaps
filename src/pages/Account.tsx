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

const Account = () => {
  const navigate = useNavigate();

  const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("parent");
    localStorage.removeItem("tokenAccess");
    localStorage.removeItem("user");
    localStorage.removeItem("medicineItems");
    localStorage.removeItem("students");
    navigate("/login");
  };

  useEffect(() => {
    const dataParent = localStorage.getItem("parent");
    const userData = dataParent ? JSON.parse(dataParent) : null;
    console.log(userData, "userData");
  }, []);

  return (
    <div className="w-full items-center min-h-screen flex flex-col gap-4 bg-gray-200">
      <Redirect title="Tài khoản" goBackTo="/" />
      <div className="flex flex-col items-start justify-start w-full px-2">
        <button
          className="border-b border-gray-300 w-full text-left py-5"
          onClick={() => navigate("/account/information-account")}
        >
          Thông tin cá nhân
        </button>
        <button
          className="border-b border-gray-300 w-full text-left py-5"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Account;
