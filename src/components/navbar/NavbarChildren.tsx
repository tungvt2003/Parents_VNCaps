import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "../../constants/images";
import { configs } from "../../configs";

const NavbarChildren = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    const handleUserChange = () => {
      const data = localStorage.getItem("user");
      setUserData(data ? JSON.parse(data) : null);
    };

    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, []);

  return (
    <div className="w-full shadow-md">
      <div className="p-3 flex flex-row w-full justify-between items-center">
        <img src={Images.LogoSmall} alt="" className="h-14" />
        <div className="flex flex-col gap-3 justify-center items-center">
          {userData && (
            <>
              <img
                src={`${configs.BASE_URL}/${userData.image}`}
                alt={userData.name}
                className="h-10 w-10 rounded-full"
              />
              <p className="text-sm text-sky-900">{userData.name}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarChildren;
