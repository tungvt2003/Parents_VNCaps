import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import MedicineList from "../pages/MedicineList";
import NewMedicineForm from "../pages/NewMedicineForm";
import AddNewMedicineItem from "../pages/AddNewMedicineItem";

const AppRouter = () => {
  return (
    <div className="w-full flex items-start justify-center">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/medicine-list" element={<MedicineList />} />
        <Route path="/new-medicine-form" element={<NewMedicineForm />} />
        <Route path="/add-new-medicine-item" element={<AddNewMedicineItem />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
