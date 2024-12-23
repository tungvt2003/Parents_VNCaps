import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Redirect = ({
  title,
  goBackTo,
}: {
  title: string;
  goBackTo?: string;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="w-full bg-[#8dc53f] h-14 flex items-center relative">
      {!isHomePage && (
        <button
          onClick={() => {
            if (goBackTo) {
              navigate(goBackTo);
            } else {
              navigate(-1);
            }
          }}
          className="absolute left-4 text-white text-xl flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>
      )}
      <span className="text-white font-semibold text-lg mx-auto">{title}</span>
    </div>
  );
};

export default Redirect;
