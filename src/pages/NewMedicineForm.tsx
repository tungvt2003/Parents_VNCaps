import { DatePicker, Form, Input, Radio, Button, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewMedicineList from "../components/medicine/NewMedicineList";
import axios from "axios";
import { configs } from "../configs";
import Redirect from "../components/Navigate/Redirect";
import Context from "./context";
import dayjs from "dayjs";
const NewMedicineForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [formValues, setFormValues] = useState({
    inputData: "",
    noteValue: "",
    customNote: "",
    dateStart: null as dayjs.Dayjs | null,
    dateEnd: null as dayjs.Dayjs | null,
  });
  const [customNote, setCustomNote] = useState("");
  useEffect(() => {
    const storedFormValues = JSON.parse(
      localStorage.getItem("medicineForm") || "{}"
    );
    setFormValues({
      inputData: storedFormValues.inputData || "",
      noteValue: storedFormValues.noteValue || "",
      customNote: storedFormValues.customNote || "",
      dateStart: dayjs(storedFormValues.dateStart) || "",
      dateEnd: dayjs(storedFormValues.dateEnd) || "",
    });

    form.setFieldsValue({
      title: storedFormValues.inputData || "",
      note: storedFormValues.noteValue || "",
      customNote: storedFormValues.customNote || "",
      dateStart: storedFormValues.dateStart
        ? dayjs(storedFormValues.dateStart)
        : null,
      dateEnd: storedFormValues.dateEnd
        ? dayjs(storedFormValues.dateEnd)
        : null,
    });
  }, [location.state]);
  const updateLocalStorage = (updatedValues) => {
    const updatedFormValues = { ...formValues, ...updatedValues };
    setFormValues(updatedFormValues);
    localStorage.setItem("medicineForm", JSON.stringify(updatedFormValues));
  };
  const handleDateStartChange = (date?: dayjs.Dayjs | null) => {
    const updatedValues = {
      dateStart: date ? date.toISOString() : null,
      dateEnd: null,
    };
    updateLocalStorage(updatedValues);
    form.setFieldValue("dateEnd", null);
  };

  const handleDateEndChange = (date?: dayjs.Dayjs | null) => {
    updateLocalStorage({ dateEnd: date ? date.toISOString() : null });
  };

  const disableEndDate = (current: dayjs.Dayjs) => {
    return current && current.isBefore(formValues.dateStart, "day");
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    const updates: Partial<typeof formValues> = { noteValue: value };
    if (value !== "other") {
      updates.customNote = "";
      setCustomNote("");
      form.setFieldValue("customNote", "");
    }
    updateLocalStorage(updates);
  };

  const handleInputChange = (e) => {
    updateLocalStorage({ inputData: e.target.value });
  };

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
        notes:
          formValues.noteValue === "other"
            ? formValues.customNote
            : formValues.noteValue || null,
        detailOfDisease: "",
        feedingAt: "",
        medicines: medicines.map((med) => ({
          name: med.medicineName,
          type:
            med.medicineType === "Viên"
              ? "pill"
              : med.medicineType === "Nước ml"
              ? "liquid"
              : "other",
          morningQuantity: Number(med.medicineMorning) || 0,
          middayQuantity: Number(med.medicineLunch) || 0,
          eveningQuantity: Number(med.medicineAfternoon) || 0,
        })),
      };

      const response = await axios.post(
        `${configs.API_URL}/medicines`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        message.success("Đơn thuốc đã được gửi thành công!");
        localStorage.removeItem("medicineForm");
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
            title: formValues.inputData,
            dateStart: formValues.dateStart,
            dateEnd: formValues.dateEnd,
            note: formValues.noteValue,
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
            <input
              placeholder="Tình trạng bệnh"
              value={formValues.inputData}
              onChange={handleInputChange}
              className="rounded-full px-5 py-3 text-lg w-full"
            />
          </Form.Item>

          <Form.Item
            name="dateStart"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{
                width: "100%",
                padding: 10,
                boxShadow: "none",
              }}
              placeholder="Chọn ngày bắt đầu"
              value={formValues.dateStart}
              onChange={handleDateStartChange}
              className="focus-visible:border-black focus-visible:shadow-none focus-visible:outline-none focus-visible:outline-0 hover:border-black"
            />
          </Form.Item>

          <Form.Item
            name="dateEnd"
            label="Ngày kết thúc"
            rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc" }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              style={{
                width: "100%",
                padding: 10,
                boxShadow: "none",
              }}
              placeholder="Chọn ngày kết thúc"
              value={formValues.dateEnd}
              onChange={handleDateEndChange}
              disabledDate={disableEndDate}
              className="focus-visible:border-black focus-visible:shadow-none focus-visible:outline-none focus-visible:outline-0 hover:border-black"
            />
          </Form.Item>

          <Form.Item
            name="note"
            label="Lưu ý khi uống thuốc"
            rules={[{ required: true, message: "Vui lòng chọn lưu ý" }]}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <Radio.Group
              className="flex flex-col gap-3"
              onChange={handleRadioChange}
            >
              <Radio value="Uống thuốc trước khi ăn" className="text-lg">
                Uống thuốc trước khi ăn
              </Radio>
              <Radio value="Uống thuốc trong khi ăn" className="text-lg">
                Uống thuốc trong khi ăn
              </Radio>
              <Radio value="Uống thuốc sau khi ăn" className="text-lg">
                Uống thuốc sau khi ăn
              </Radio>
              <Radio value="other" className="text-lg">
                Lưu ý khác
              </Radio>
              {formValues.noteValue === "other" && (
                <Form.Item
                  name="customNote"
                  rules={[
                    { required: true, message: "Vui lòng nhập lưu ý khác" },
                  ]}
                >
                  <Input
                    placeholder="Nhập lưu ý khác"
                    value={customNote}
                    onChange={(e) => {
                      const newCustomNote = e.target.value;
                      setCustomNote(newCustomNote);
                      updateLocalStorage({ customNote: newCustomNote });
                    }}
                    className="border-0 border-b border-gray-900 rounded-none"
                  />
                </Form.Item>
              )}
            </Radio.Group>
          </Form.Item>
        </Form>
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
      </div>
      <div className="h-14"></div>
    </div>
  );
};

export default NewMedicineForm;
