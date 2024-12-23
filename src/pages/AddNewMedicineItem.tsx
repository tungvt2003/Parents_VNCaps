import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Redirect from "../components/Navigate/Redirect";

const AddNewMedicineItem = () => {
  const [medicineData, setMedicineData] = useState({
    medicineName: "",
    medicineType: "Viên",
    medicineMorning: "",
    medicineLunch: "",
    medicineAfternoon: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setMedicineData({ ...medicineData, [field]: value });
  };

  const handleSubmit = () => {
    const {
      medicineName,
      medicineType,
      medicineMorning,
      medicineLunch,
      medicineAfternoon,
    } = medicineData;

    if (!medicineName) {
      return message.error("Bạn cần nhập tên thuốc!");
    }

    const newMedicineItem = {
      medicineName,
      medicineType,
      medicineMorning,
      medicineLunch,
      medicineAfternoon,
    };
    const existingItems = JSON.parse(
      localStorage.getItem("medicineItems") || "[]"
    );
    localStorage.setItem(
      "medicineItems",
      JSON.stringify([...existingItems, newMedicineItem])
    );

    setMedicineData({
      medicineName: "",
      medicineType: "Viên",
      medicineMorning: "",
      medicineLunch: "",
      medicineAfternoon: "",
    });

    navigate("/new-medicine-form", { state: { fromNewMedicineItem: true } });
  };

  const renderInputField = (
    label,
    field,
    type = "text",
    placeholder = "Nhập số lượng"
  ) => (
    <div className="flex flex-col items-center gap-2 w-full">
      <label className="font-medium w-full">{label}:</label>
      <input
        type={type}
        placeholder={placeholder}
        value={medicineData[field]}
        onChange={(e) => handleInputChange(field, e.target.value)}
        className="p-3 bg-white rounded-2xl w-full"
      />
    </div>
  );

  return (
    <div className="w-full items-center min-h-screen flex flex-col bg-gray-200">
      <Redirect title="Thêm thuốc" goBackTo="/new-medicine-form" />
      <div className="gap-5 p-2 pt-5 w-full flex flex-col">
        <input
          type="text"
          className="p-3 bg-white rounded-2xl w-full"
          placeholder="Tên thuốc"
          value={medicineData.medicineName}
          onChange={(e) => handleInputChange("medicineName", e.target.value)}
        />

        <select
          className="p-3 bg-white rounded-2xl w-full mr-4"
          value={medicineData.medicineType}
          onChange={(e) => handleInputChange("medicineType", e.target.value)}
        >
          <option value="Viên">Viên</option>
          <option value="Gói">Gói</option>
          <option value="Nước ml">Nước (ml)</option>
        </select>

        <div className="flex gap-3 flex-col w-full">
          {renderInputField("Sáng", "medicineMorning", "number")}
          {renderInputField("Trưa", "medicineLunch", "number")}
          {renderInputField("Chiều", "medicineAfternoon", "number")}
        </div>

        <button
          className="w-full bg-[#8dc53f] p-3 rounded-lg text-white"
          onClick={handleSubmit}
        >
          Thêm vào đơn thuốc
        </button>
      </div>
    </div>
  );
};

export default AddNewMedicineItem;
