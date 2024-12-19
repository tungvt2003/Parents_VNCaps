import { DatePicker, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MedicineItem } from "../types/medicine";
import NewMedicineList from "../components/medicine/NewMedicineList";

const NewMedicineForm = () => {
  const { RangePicker } = DatePicker;
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full items-center justify-center min-h-screen flex flex-col gap-5 p-2 bg-gray-200">
      <button className="w-full bg-lime-500 p-3 rounded-lg text-white flex items-center justify-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-send"
        >
          <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
          <path d="m21.854 2.147-10.94 10.939" />
        </svg>
        <p className="font-semibold">Gởi đơn thuốc</p>
      </button>
      <h3 className="font-bold">
        Phụ huynh lưu ý dặn đúng liều lượng và số lần uống, nếu quên hoặc dặn
        không đúng thì nhà trường và giáo viên sẽ không chịu trách nhiệm.
      </h3>
      <input
        type="text"
        className="p-3 bg-white rounded-2xl w-full"
        placeholder="Tình trạng bệnh"
      />
      <DatePicker
        size="large"
        style={{ width: "100%" }}
        placeholder="Chọn ngày bắt đầu"
        format={"DD/MM/YYYY"}
      />
      <DatePicker
        size="large"
        style={{ width: "100%" }}
        placeholder="Chọn ngày kết thúc"
        format={"DD/MM/YYYY"}
      />
      <div className="p-2 bg-white rounded-2xl flex flex-col gap-2 w-full">
        <p className="pb-2 border-b border-gray-300 font-bold">Lưu ý</p>
        <div className="flex flex-col gap-2 w-full">
          <label className="flex gap-2">
            <input type="radio" name="medicineTiming" value="before" />
            Uống thuốc trước khi ăn
          </label>
          <label className="flex gap-2">
            <input type="radio" name="medicineTiming" value="during" />
            Uống thuốc trong khi ăn
          </label>
          <label className="flex gap-2">
            <input type="radio" name="medicineTiming" value="after" />
            Uống thuốc sau khi ăn
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="medicineTiming"
              value="other"
              onChange={(e) => setNote(e.target.value)}
            />
            Lưu ý khác
          </label>
          {note === "other" && (
            <input
              type="text"
              className="p-2 bg-gray-100 rounded-lg"
              placeholder="Nhập lưu ý khác"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold">Liều dùng thuốc</h3>
        <NewMedicineList />
        <button
          className="w-full bg-lime-500 p-3 rounded-lg text-white flex items-center justify-center gap-2"
          onClick={() => navigate("/add-new-medicine-item")}
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
          <p className="font-semibold">Thêm thuốc</p>
        </button>
      </div>
    </div>
  );
};

export default NewMedicineForm;
