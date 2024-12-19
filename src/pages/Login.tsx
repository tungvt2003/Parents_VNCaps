import React, { useState } from "react";
import BgImage from "../assets/login_without_logo.png";
import Logo from "../assets/logo_small.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(import.meta.env.VITE_API_URL);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data.students[0]);
      if (response.data.token) {
        sessionStorage.removeItem("user");
        sessionStorage.setItem(
          "user",
          JSON.stringify(response.data.students[0])
        );
        navigate("/home");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${BgImage})` }}
      className="min-h-screen bg-cover bg-center w-full pt-24 px-14"
    >
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <img src={Logo} alt="" className="h-32" />
        <input
          type="text"
          placeholder="Email"
          className="p-2 border-2 border-lime-500 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border-2 border-lime-500 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-lime-500 text-white p-2 hover:opacity-75 duration-300 nunito"
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
