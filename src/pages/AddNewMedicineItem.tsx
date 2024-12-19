import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewMedicineItem = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineType, setMedicineType] = useState("Viên");
  const [medicineMorning, setMedicineMorning] = useState<string | undefined>(
    ""
  );
  const [medicineLunch, setMedicineLunch] = useState<string | undefined>("");
  const [medicineAfternoon, setMedicineAfternoon] = useState<
    string | undefined
  >("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const medicineItem = {
      medicineName,
      medicineType,
      medicineMorning,
      medicineLunch,
      medicineAfternoon,
    };
    if (medicineName) {
      const existingItems = JSON.parse(
        sessionStorage.getItem("medicineItems") || "[]"
      );
      existingItems.push(medicineItem);
      sessionStorage.setItem("medicineItems", JSON.stringify(existingItems));
      setMedicineName("");
      setMedicineType("Viên");
      setMedicineMorning(undefined);
      setMedicineLunch(undefined);
      setMedicineAfternoon(undefined);
      navigate("/new-medicine-form");
    } else message.error("Bạn cần nhập tên thuốc!");
  };

  return (
    <div className="w-full items-center justify-center min-h-screen flex flex-col gap-5 p-2 bg-gray-200">
      <h2 className="font-bold text-lg">Thêm thuốc mới</h2>
      <input
        type="text"
        className="p-3 bg-white rounded-2xl w-full"
        placeholder="Tên thuốc"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
      />
      <select
        className="p-3 bg-white rounded-2xl w-full"
        value={medicineType}
        onChange={(e) => setMedicineType(e.target.value)}
      >
        <option value="Viên">Viên</option>
        <option value="Gói">Gói</option>
        <option value="Nước ml">Nước (ml)</option>
      </select>
      <div className="flex gap-3 flex-col w-full">
        <div className="flex flex-col items-center gap-2">
          <label className="font-medium w-full">Sáng:</label>
          <input
            type="number"
            placeholder="Nhập số lượng"
            value={medicineMorning}
            onChange={(e) => setMedicineMorning(e.target.value)}
            className="p-3 bg-white rounded-2xl w-full"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="font-medium w-full">Trưa:</label>
          <input
            type="number"
            placeholder="Nhập số lượng"
            value={medicineLunch}
            onChange={(e) => setMedicineLunch(e.target.value)}
            className="p-3 bg-white rounded-2xl w-full"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="font-medium w-full">Chiều:</label>
          <input
            type="number"
            placeholder="Nhập số lượng"
            value={medicineAfternoon}
            onChange={(e) => setMedicineAfternoon(e.target.value)}
            className="p-3 bg-white rounded-2xl w-full"
          />
        </div>
      </div>
      <button
        className="w-full bg-lime-500 p-3 rounded-lg text-white"
        onClick={handleSubmit}
      >
        Thêm vào đơn thuốc
      </button>
    </div>
  );
};

export default AddNewMedicineItem;
