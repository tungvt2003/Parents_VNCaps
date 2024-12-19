import React from "react";
import BgImage from "../assets/bg.jpg";
import FoodImage from "../assets/food.png";
import BookImage from "../assets/book.png";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
const Home = () => {
  return (
    <div
      className="w-full items-center justify-center min-h-screen bg-cover bg-center flex flex-col gap-5"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <Navbar />
      <Link
        to={"/"}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <div className="p-3 rounded-full bg-[#adfcfe]">
          <img src={FoodImage} alt="" className="h-16 w-16 " />
        </div>
        <p className="text-white drop-shadow-md">Thời khóa biểu & thực đơn</p>
      </Link>
      <Link
        to={"/medicine-list"}
        className="flex flex-col gap-2 items-center justify-center"
      >
        <div className="p-3 rounded-full bg-[#adfcfe]">
          <img src={BookImage} alt="" className="h-16 w-16 " />
        </div>
        <p className="text-white drop-shadow-md">Sổ dặn thuốc</p>
      </Link>
    </div>
  );
};

export default Home;
