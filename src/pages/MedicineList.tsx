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

const MedicineList = () => {
  const navigate = useNavigate();

  const [dataMedicine, setDataMedicine] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const token = localStorage.getItem("tokenAccess");
    const userData = data ? JSON.parse(data) : null;
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(`${configs.API_URL}/medicines`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        setDataMedicine(response.data?.docs);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 1;

  const totalPages = Math.ceil(dataMedicine.length / itemsPerPage);

  const currentData = dataMedicine.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="w-full items-center min-h-screen flex flex-col gap-4 bg-gray-200">
      <Redirect title="Sổ dặn thuốc" goBackTo="/" />
      <div className="flex flex-col w-full gap-5 p-2">
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={() => navigate("/new-medicine-form")}
          className=" bg-[#8dc53f] hover:!bg-[#8dc53f] hover:opacity-70 text-base font-medium py-5 rounded-full shadow-md"
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
          <span className="font-[Nunito]">Dặn thuốc</span>
        </Button>
        {loading ? (
          <CustomSpin />
        ) : (
          <>
            {currentData.map((item, index) => (
              <div
                className="bg-white p-4 flex flex-col w-full max-w-md rounded-md shadow-md"
                key={index}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p>{item.status ? "(Đã tiếp nhận)" : "(Chưa tiếp nhận)"}</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <p>Uống thuốc</p>
                  <p className="font-bold text-lg">{`${new Date(
                    item.dateStart
                  ).toLocaleDateString()} - ${new Date(
                    item.dateEnd
                  ).toLocaleDateString()}`}</p>
                </div>
                {item.medicines.map((medicine, i) => (
                  <div key={i}>
                    <div className="flex flex-row justify-between items-center">
                      <p className="font-semibold">
                        {i + 1}. {medicine.name}
                      </p>
                      <span>
                        <p>
                          {medicine.morningQuantity +
                            medicine.middayQuantity +
                            medicine.eveningQuantity}{" "}
                          ({renderMedicineType(medicine.type)})
                        </p>
                      </span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>
                        Sáng {medicine.morningQuantity} (
                        {renderMedicineType(medicine.type)})
                      </p>
                      <p>
                        Trưa {medicine.middayQuantity} (
                        {renderMedicineType(medicine.type)})
                      </p>
                      <p>
                        Chiều {medicine.eveningQuantity} (
                        {renderMedicineType(medicine.type)})
                      </p>
                    </div>
                  </div>
                ))}
                <p className="font-bold">Lưu ý: {item.notes}</p>
              </div>
            ))}

            <div className="flex justify-between items-center w-full max-w-md">
              <button
                className={`px-8 py-2 rounded-lg text-white shadow-md ${
                  currentPage === 0 ? "bg-black " : "bg-[#8dc53f] "
                }`}
                onClick={handlePrev}
                disabled={currentPage === 0}
              >
                Lùi về
              </button>
              <p className="px-8 py-2 rounded-lg text-white bg-[#8dc53f] shadow-md">
                Trang {currentPage + 1}
              </p>
              <button
                className={`px-8 py-2 rounded-lg text-white shadow-md ${
                  currentPage === totalPages - 1 ? "bg-black " : "bg-[#8dc53f] "
                }`}
                onClick={handleNext}
                disabled={currentPage === totalPages - 1}
              >
                Tiến tới
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedicineList;
