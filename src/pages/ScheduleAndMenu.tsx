import React, { useEffect, useState } from "react";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { configs } from "../configs";
import moment from "moment";
import CustomSpin from "../components/Spin/CustomSpin";
import ImagePreviewGroupComponent from "../components/ImagePreview/ImagePreview";
import Redirect from "../components/Navigate/Redirect";
import { read, utils } from "xlsx";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
const inferFileType = (url: string): string => {
  const extension = url.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "pdf":
      return "pdf";
    case "xlsx":
    case "xls":
      return "xlsx";
    default:
      return "unknown";
  }
};
const ScheduleAndMenu = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  interface ScheduleItem {
    url: string;
    type: string;
  }

  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [menuData, setMenuData] = useState<[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [loadingMenu, setLoadingMenu] = useState(false);

  const fetchSchedule = async (date: string) => {
    try {
      setLoadingSchedule(true);
      const data = localStorage.getItem("user");
      const token = localStorage.getItem("tokenAccess");
      const userData = data ? JSON.parse(data) : null;

      if (!userData || !userData._id || !token) {
        return message.error("Thông tin người dùng không hợp lệ.");
      }

      if (!date || isNaN(new Date(date).getTime())) {
        return message.error("Ngày không hợp lệ. Vui lòng chọn lại.");
      }

      const formattedDate = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
      const requestData = {
        classId: userData.class._id,
        date: formattedDate,
      };

      const response = await axios.get(`${configs.API_URL}/schedule-photo`, {
        params: requestData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const enrichedData = response.data.docs.map((item: any) => ({
          url: item.url,
          type: item.type || inferFileType(item.url),
        }));
        console.log("b", enrichedData);

        setScheduleData(enrichedData);
      }
    } catch (error) {
      console.error(error);
      message.error("Không thể tải thời khóa biểu. Vui lòng thử lại.");
    } finally {
      setLoadingSchedule(false);
    }
  };

  const fetchMenu = async (date: string) => {
    try {
      setLoadingMenu(true);
      const data = localStorage.getItem("user");
      const token = localStorage.getItem("tokenAccess");
      const userData = data ? JSON.parse(data) : null;

      if (!userData || !userData._id || !token) {
        return message.error("Thông tin người dùng không hợp lệ.");
      }

      if (!date || isNaN(new Date(date).getTime())) {
        return message.error("Ngày không hợp lệ. Vui lòng chọn lại.");
      }

      const formattedDate = moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
      const requestData = {
        date: formattedDate,
      };

      const response = await axios.get(`${configs.API_URL}/menu`, {
        params: requestData,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const enrichedData = response.data.menus.docs.map((item: any) => ({
          url: item.url,
          type: item.type || inferFileType(item.url),
        }));
        console.log("c", enrichedData);

        setMenuData(enrichedData);
      }
    } catch (error) {
      console.error(error);
      message.error("Không thể tải thực đơn. Vui lòng thử lại.");
    } finally {
      setLoadingMenu(false);
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setSelectedDate(date);
      fetchSchedule(date.format("YYYY-MM-DD"));
      fetchMenu(date.format("YYYY-MM-DD"));
    }
  };
  const renderPreview = (data: ScheduleItem[]) => {
    return data.map((item, index) => {
      if (item.type === "image") {
        return <ImagePreviewGroupComponent key={index} data={[item]} />;
      } else if (item.type === "pdf" || item.type === "xlsx") {
        return (
          <DocViewer
            documents={[
              {
                uri: `${configs.BASE_URL}/${item.url}`,
                fileType: item.type,
                fileName: `${configs.BASE_URL}/${item.url}`,
              },
            ]}
            style={{ height: "100%", width: "100%" }}
          />
        );
      } else {
        return <p key={index}>Không thể hiển thị tệp này.</p>;
      }
    });
  };

  useEffect(() => {
    const today = dayjs();
    setSelectedDate(today);
    fetchSchedule(today.format("YYYY-MM-DD"));
    fetchMenu(today.format("YYYY-MM-DD"));
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      <Redirect title="Sổ dặn thuốc" goBackTo="/" />
      <div className="flex justify-around w-full bg-[#8dc53f] text-white text-lg font-semibold">
        <button
          onClick={() => setActiveTab("schedule")}
          className={`flex-1 py-3 ${
            activeTab === "schedule" ? "border-b-4 border-white" : "opacity-70"
          }`}
        >
          Thời Khóa Biểu
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex-1 py-3 ${
            activeTab === "menu" ? "border-b-4 border-white" : "opacity-70"
          }`}
        >
          Thực Đơn
        </button>
      </div>

      <div className="w-full p-4">
        {activeTab === "schedule" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <label className="text-gray-700 font-medium">Xem ngày:</label>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                format="DD/MM/YYYY"
                className="flex-1 border-0 bg-transparent outline-none text-gray-800 font-medium"
                placeholder="Chọn ngày"
              />
            </div>

            {loadingSchedule ? (
              <CustomSpin />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-4">
                {scheduleData.length > 0 ? (
                  <div className="bg-white h-full">
                    {renderPreview(scheduleData)}
                  </div>
                ) : (
                  <p>Thời khóa biểu đang được tạo.</p>
                )}
              </div>
            )}
            <div className="h-14"></div>
          </div>
        )}

        {activeTab === "menu" && (
          <div className="bg-white rounded-lg shadow-md p-4">
            {loadingMenu ? (
              <CustomSpin />
            ) : menuData.length > 0 ? (
              renderPreview(menuData)
            ) : (
              <p>Thực đơn đang được tạo.</p>
            )}
            <div className="h-14"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleAndMenu;
