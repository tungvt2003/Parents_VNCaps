import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { MedicineItem } from "../../types/medicine";

const NewMedicineList = () => {
  const [medicineItems, setMedicineItems] = useState([]);
  const removeMedicineItem = (index: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa thuốc này khỏi danh sách không?",
      okText: "Xóa",
      cancelText: "Hủy",
      okType: "danger",
      onOk: () => {
        const updatedItems = [...medicineItems];
        updatedItems.splice(index, 1);
        setMedicineItems(updatedItems);
        localStorage.setItem("medicineItems", JSON.stringify(updatedItems));
      },
    });
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("medicineItems") || "[]");
    setMedicineItems(items);
  }, []);

  return medicineItems.length > 0 ? (
    <div className="w-full bg-white rounded-lg p-4 space-y-3 shadow-md">
      {medicineItems.map((item: MedicineItem, index) => (
        <div
          key={index}
          className="border-b border-gray-200 pb-3 last:border-0"
        >
          <div className="font-semibold">{item.medicineName}</div>
          <div className="text-sm text-gray-600">
            <span>Dạng thuốc: {item.medicineType}</span>
          </div>
          <div className="flex flex-row items-center justify-between mt-2">
            <div className="text-sm">Sáng: {item.medicineMorning || "0"}</div>
            <div className="text-sm">Trưa: {item.medicineLunch || "0"}</div>
            <div className="text-sm">
              Chiều: {item.medicineAfternoon || "0"}
            </div>
            <button
              onClick={() => {
                removeMedicineItem(index);
              }}
              className="text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default NewMedicineList;
