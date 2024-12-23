import React from "react";
import { Link } from "react-router-dom";
import { Images } from "../constants/images";
import Redirect from "../components/Navigate/Redirect";
import NavbarChildren from "../components/navbar/NavbarChildren";
import NavbarFooter from "../components/navbar/NavbarFooter";

const Home = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col relative"
      style={{ backgroundImage: `url(${Images.BgImage})` }}
    >
      <Redirect title="Trang chủ" />
      <NavbarChildren />
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col gap-5 items-center">
          <Link
            to={"/schedule-menu"}
            className="flex flex-col gap-3 items-center justify-center rounded-xl"
          >
            <div className="p-4 rounded-full bg-[#adfcfe] shadow-lg">
              <img src={Images.FoodImage} alt="" className="h-16 w-16" />
            </div>
            <p className="text-white bg-black/50 px-4 py-2 rounded-md text-center text-lg font-semibold h-12 flex items-center justify-center">
              Thời khóa biểu & thực đơn
            </p>
          </Link>

          <Link
            to={"/medicine-list"}
            className="flex flex-col gap-3 items-center justify-center rounded-xl"
          >
            <div className="p-4 rounded-full bg-[#adfcfe] shadow-lg">
              <img src={Images.BookImage} alt="" className="h-16 w-16" />
            </div>
            <p className="text-white bg-black/50 px-4 py-2 rounded-md text-center text-lg font-semibold h-12 flex items-center justify-center">
              Sổ dặn thuốc
            </p>
          </Link>
        </div>
      </div>
      {/* <NavbarFooter /> */}
    </div>
  );
};

export default Home;
