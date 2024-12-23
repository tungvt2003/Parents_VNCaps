import { DatePicker, Form, Input, Radio, Button, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewMedicineList from "../components/medicine/NewMedicineList";
import axios from "axios";
import { configs } from "../configs";
import Redirect from "../components/Navigate/Redirect";
import Context from "./context";

const NewMedicineForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [noteValue, setNoteValue] = useState("");
  const [customNote, setCustomNote] = useState("");
  const { inputData, setInputData } = useContext(Context);

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setNoteValue(value);

    if (value !== "other") {
      setCustomNote("");
      form.setFieldValue("customNote", "");
    }
  };

  console.log(inputData, "inputData");

  const handleAddMedicine = async (values) => {
    try {
      const data = localStorage.getItem("user");
      const token = localStorage.getItem("tokenAccess");
      const medicines = JSON.parse(
        localStorage.getItem("medicineItems") || "[]"
      );
      const userData = data ? JSON.parse(data) : null;

      if (!userData || !userData._id || !token) {
        return message.error("Thông tin người dùng không hợp lệ.");
      }

      const requestData = {
        studentId: userData._id,
        title: values.title,
        dateStart: values.dateStart.toISOString(),
        dateEnd: values.dateEnd.toISOString(),
        notes: noteValue === "other" ? customNote : noteValue || null,
        detailOfDisease: values.detailOfDisease || null,
        feedingAt: values.feedingAt || null,
        medicines: medicines.map((med) => ({
          name: med.medicineName,
          type:
            med.medicineType === "Viên"
              ? "pill"
              : med.medicineType === "Nước ml"
              ? "liquid"
              : "other",
          morningQuantity: med.medicineMorning || 0,
          middayQuantity: med.medicineLunch || 0,
          eveningQuantity: med.medicineAfternoon || 0,
        })),
      };

      const response = await axios.post(
        `${configs.API_URL}/medicines/${userData._id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Đơn thuốc đã được gửi thành công!");
        navigate("/medicine-list");
      }
    } catch (error) {
      console.error(error);
      message.error("Gửi đơn thuốc thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="w-full items-center min-h-screen flex flex-col bg-gray-200">
      <Redirect title="Dặn thuốc" goBackTo="/medicine-list" />
      <div className="p-2 w-full">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddMedicine}
          className="w-full max-w-md custom-form"
          initialValues={{
            title: inputData,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            className="mt-4 mb-4 bg-[#8dc53f] hover:!bg-[#8dc53f] hover:opacity-70 text-base font-medium py-5 rounded-full shadow-md"
          >
            Gửi đơn thuốc
          </Button>
          <h2 className="text-base font-bold items-baseline mb-4 text-justify">
            Phụ huynh lưu ý dặn đúng liều lượng và số lần uống, nếu hoặc dặn
            không đúng thì nhà trường và giáo viên sẽ không chịu trách nhiệm
          </h2>
          <Form.Item
            name="title"
            rules={[
              { required: true, message: "Vui lòng nhập tình trạng bệnh" },
            ]}
          >
            <Input
              placeholder="Tình trạng bệnh"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="rounded-full px-5 py-3 text-lg focus-visible:border-none  focus-visible:shadow-none focus-visible:outline-none focus-visible:outline-0 hover:border-none"
            />
          </Form.Item>

          <Form.Item
            name="dateStart"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="dateEnd"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="note"
            label="Lưu ý khi uống thuốc"
            rules={[{ required: true, message: "Vui lòng chọn lưu ý" }]}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Radio.Group className="flex flex-col" onChange={handleRadioChange}>
              <Radio value="Uống thuốc trước khi ăn">
                Uống thuốc trước khi ăn
              </Radio>
              <Radio value="Uống thuốc trong khi ăn">
                Uống thuốc trong khi ăn
              </Radio>
              <Radio value="Uống thuốc sau khi ăn">Uống thuốc sau khi ăn</Radio>
              <Radio value="other">Lưu ý khác</Radio>
              {noteValue === "other" && (
                <Form.Item
                  name="customNote"
                  rules={[
                    { required: true, message: "Vui lòng nhập lưu ý khác" },
                  ]}
                >
                  <Input
                    placeholder="Nhập lưu ý khác"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="border-0 border-b border-gray-900 rounded-none"
                  />
                </Form.Item>
              )}
            </Radio.Group>
          </Form.Item>

          <div className="flex flex-col gap-5 w-full">
            <h3 className="font-bold">Liều dùng thuốc</h3>
            <NewMedicineList />
            <div>
              <hr className="bg-gray-600 h-[2px] opacity-50" />
              <Button
                type="primary"
                block
                onClick={() => navigate("/add-new-medicine-item")}
                className="mt-2 mb-4 bg-[#8dc53f] hover:!bg-[#8dc53f] hover:opacity-70 text-base font-medium py-5 rounded-full shadow-md "
              >
                Thêm thuốc
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewMedicineForm;
