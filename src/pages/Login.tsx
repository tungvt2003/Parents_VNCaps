import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Images } from "../constants/images";
import { Form, Button, message } from "antd";
import { configs } from "../configs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${configs.API_URL}/user/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data.students[0]));
        localStorage.setItem("tokenAccess", response.data.token);
        localStorage.setItem("parent", JSON.stringify(response.data.user));
        localStorage.setItem(
          "students",
          JSON.stringify(response.data.students)
        );
        navigate("/");
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.error("Đăng nhập thất bại:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${Images.BgLogin})` }}
      className="min-h-screen bg-cover bg-center w-full pt-24 px-14"
    >
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <img src={Images.Logo} alt="" className="h-32" />
        <Form className="w-full">
          <Form.Item className="flex items-center border border-[#8dc73f] mb-4">
            <div className="flex">
              <span className="p-2 bg-[#8dc73f] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-r-md outline-none"
              />
            </div>
          </Form.Item>
          <Form.Item className="flex items-center border border-[#8dc73f] mb-4 w-full">
            <div className="flex w-full">
              <span className="p-2 bg-[#8dc73f] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-key-round"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                </svg>
              </span>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-r-md outline-none"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleLogin}
              type="primary"
              htmlType="submit"
              className="w-full bg-[#8dc73f] text-white text-lg rounded-sm hover:!bg-opacity-85 p-5 shadow-md hover:!bg-[#8dc73f]"
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
