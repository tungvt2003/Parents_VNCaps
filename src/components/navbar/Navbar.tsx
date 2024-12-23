import React, { useEffect, useState } from "react";
import { Images } from "../../constants/images";
const Navbar = () => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setCurrentUser(user);
    }
  }, []);
  return (
    <div className="py-2 px-5 drop-shadow-md flex flex-row justify-between items-center fixed top-0 left-0 right-0 z-10 bg-white">
      <img src={Images.LogoSmall} alt="" className="h-12" />
      <div className="p-1.5 border-2 border-gray-300 bg-white rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-align-justify"
        >
          <path d="M3 12h18" />
          <path d="M3 18h18" />
          <path d="M3 6h18" />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
