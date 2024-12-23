import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MedicineList from "../pages/MedicineList";
import NewMedicineForm from "../pages/NewMedicineForm";
import AddNewMedicineItem from "../pages/AddNewMedicineItem";
import ScheduleAndMenu from "../pages/ScheduleAndMenu";
import Account from "../pages/Account";
import NavbarFooter from "../components/navbar/NavbarFooter";
import InformationAccount from "../pages/InformationAccount";

const AppRouter = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenAccess = localStorage.getItem("tokenAccess");
    const user = localStorage.getItem("user");
    const pathname = window.location.pathname;
    if (!tokenAccess || !user) {
      navigate("/login");
    } else if (pathname === "/login") {
      navigate("/");
    }
  }, []);
  return (
    <div className="w-full flex items-start justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicine-list" element={<MedicineList />} />
        <Route path="/new-medicine-form" element={<NewMedicineForm />} />
        <Route path="/add-new-medicine-item" element={<AddNewMedicineItem />} />
        <Route path="/schedule-menu" element={<ScheduleAndMenu />} />
        <Route path="/account" element={<Account />} />
        <Route
          path="/account/information-account"
          element={<InformationAccount />}
        />
        {/* <Route path="/information-account" element={<InformationAccount />} /> */}
      </Routes>
      {window.location.pathname !== "/login" && <NavbarFooter />}
    </div>
  );
};

export default AppRouter;
