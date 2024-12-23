import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { Images } from "../../constants/images";
import { configs } from "../../configs";
import { Student } from "../../types/user";

const NavbarFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const isNotAccount = !location.pathname.startsWith("/account");
  const dataStudents = JSON.parse(localStorage.getItem("students") || "[]");
  useEffect(() => {
    const savedStudent = localStorage.getItem("user");
    if (savedStudent) {
      const parsedStudent = JSON.parse(savedStudent);
      if (parsedStudent?._id) {
        setSelectedStudentId(parsedStudent._id);
        console.log(parsedStudent._id);
      }
    }
  }, []);
  console.log("asdasdasd", selectedStudentId);

  return (
    <>
      <div className="fixed bottom-0 bg-white shadow-md border-t flex justify-around py-2 z-50 max-w-md w-full">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${
            isNotAccount ? "text-lime-500" : "text-gray-500"
          } hover:text-lime-500`}
        >
          <HomeOutlined className="text-xl mb-1" />
          <span className="text-sm">Trang chủ</span>
        </button>

        <button
          onClick={() => navigate("/account")}
          className={`flex flex-col items-center ${
            isActive("/account") ? "text-lime-500" : "text-gray-500"
          } hover:text-lime-500`}
        >
          <UserOutlined className="text-xl mb-1" />
          <span className="text-sm">Tài khoản</span>
        </button>

        <button
          onClick={showDrawer}
          className={`flex flex-col items-center ${
            isDrawerVisible ? "text-lime-500" : "text-gray-500"
          } hover:text-lime-500`}
        >
          <MenuOutlined className="text-xl mb-1" />
          <span className="text-sm">FABs</span>
        </button>
      </div>

      <Drawer
        title={
          <div className="flex items-center gap-3">
            <img
              src={Images.Logo}
              alt="Logo"
              className="w-2/3 h-auto rounded-full"
            />
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={isDrawerVisible}
        className="custom-drawer"
        closable={false}
        style={{ maxWidth: "70%" }}
      >
        <button
          onClick={closeDrawer}
          className="absolute top-2 right-1/3 text-lg text-gray-500 hover:text-gray-800 p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <div className="flex flex-col divide-y divide-gray-200">
          {dataStudents.map((student: Student) => (
            <button
              key={student._id}
              onClick={() => {
                localStorage.setItem("user", JSON.stringify(student));
                setSelectedStudentId(student._id);
                window.dispatchEvent(new Event("userChange"));
              }}
              className={`flex items-center gap-4 p-4 hover:bg-gray-100 ${
                selectedStudentId === student._id ? "bg-[#f3f3f3]" : ""
              }`}
            >
              <img
                src={configs.BASE_URL + "/" + student.image}
                alt={student.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lime-500 font-semibold">{student.name}</p>
                <p className="text-gray-500 text-sm">{student.class.name}</p>
              </div>
            </button>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default NavbarFooter;
