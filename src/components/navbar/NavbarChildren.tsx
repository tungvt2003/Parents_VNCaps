import React from "react";
import { useNavigate } from "react-router-dom";
import { Images } from "../../constants/images";

const NavbarChildren = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full shadow-md">
      <div className="p-5">
        <img src={Images.LogoSmall} alt="" className="h-14" />
      </div>
    </div>
  );
};

export default NavbarChildren;
