import React, { use, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import { CiPhone } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../AxiosClient";
const FormLogin = () => {
  const navigate = useNavigate();
  const [valueUseraccounnt, setValueUseraccount] = useState("");
  const [password, setPassword] = useState("");
  const handleUserAccount = (e) => {
    setValueUseraccount(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (valueUseraccounnt == "") {
      alert("vui lòng nhập tài khoản");
      return;
    }
    if (password == "") {
      alert("vui lòng nhập password");
      return;
    }

    const userLogin = {
      account_user: valueUseraccounnt,
      password: password,
    };

    axiosClient
      .post("/auth/login", userLogin, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.statusCode == 400) {
          alert(res.data.message);
        } else if (res.data.statusCode == 404) {
          alert(res.data.message);
        } else {
          navigate(localStorage.getItem("page_before"), {
            state: {
              statusCode: res.data.statusCode,
            },
          });
        }
      })
      .catch((err) => {
        console.log("không call api được");
      });
    setValueUseraccount("");
    setPassword("");
  };
  return (
    <form
      id="login "
      className="h-screen flex flex-col justify-center items-center bg-gray-300"
    >
      <div
        className="flex flex-col gap-y-[10px] h-[300px] justify-center w-96 
                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400
                hover:from-gray-400 hover:via-gray-300 hover:to-gray-200
                items-center rounded-2xl shadow-md
                transition-colors duration-500 ease-in-out"
      >
        <h1 className="text-2xl font-extrabold text-center">Đăng Nhập</h1>
        <div className="relative">
          <VscAccount className="absolute top-1 left-1 text-gray-500" />
          <input
            type="text"
            className="border pl-6 rounded-lg outline-none required placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 hover:cursor-pointer font-extralight"
            placeholder="Nhập tài khoản...."
            required
            value={valueUseraccounnt}
            onChange={handleUserAccount}
          />
        </div>
        <div className="relative">
          <TbLockPassword className="absolute top-1 left-1 text-gray-500" />
          <input
            type="text"
            name=""
            id=""
            className="border pl-6 rounded-lg outline-none required placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 hover:cursor-pointer font-extralight"
            placeholder="Nhập mật khẩu..."
            required
            value={password}
            onChange={handlepassword}
          />
        </div>
        <div className="flex justify-center gap-x-[10px]">
          <Link to={"/registry"}>
            <button
              className="text-[10px] border w-[60px] py-[3px] rounded-lg hover:text-red-500 duration-300 transition-colors ease-in-out hover:cursor-pointer"
              type="button"
            >
              Đăng kí
            </button>
          </Link>
          <button
            className="text-[10px] border  w-[60px] py-[3px] rounded-lg hover:text-blue-500 duration-300 transition-colors ease-in-out hover:cursor-pointer"
            type="button"
            onClick={handleLogin}
          >
            Đăng nhập
          </button>
        </div>
        <h1 className="text-[10px] font-medium" style={{ color: "red" }}>
          Đăng nhập bằng phương thức khác
        </h1>
        <div className="flex gap-x-[30px] justify-between items-center">
          <FcGoogle
            className="hover:cursor-pointer"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/oauth2/authorization/google";
            }}
          />
          <FaFacebook className="text-blue-500 hover:cursor-pointer" />
        </div>
      </div>
    </form>
  );
};
export default FormLogin;
