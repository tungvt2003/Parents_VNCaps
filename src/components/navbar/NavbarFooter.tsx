import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HomeOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import { Images } from "../../constants/images";
import { configs } from "../../configs";

const NavbarFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const isNotAccount = !location.pathname.startsWith("/account");
  const dataStudents = JSON.parse(localStorage.getItem("students") || "[]");

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
              className="w-full h-32 rounded-full"
            />
          </div>
        }
        placement="left"
        onClose={closeDrawer}
        open={isDrawerVisible}
        className="custom-drawer"
      >
        <div className="flex flex-col divide-y divide-gray-200">
          {dataStudents.map((student) => (
            <button
              key={student.id}
              onClick={() => navigate(`/student/${student.id}`)} // Navigate đến trang của từng học sinh
              className="flex items-center gap-4 p-4 hover:bg-gray-100"
            >
              <img
                src={configs.BASE_URL + "/" + student.image}
                alt={student.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lime-500 font-semibold">{student.name}</p>
                <p className="text-gray-500 text-sm">{student.nickname}</p>
              </div>
            </button>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default NavbarFooter;
