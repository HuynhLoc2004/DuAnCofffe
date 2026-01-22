import React, { use, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import { CiPhone } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
const FormRegister = () => {
  const [valueUseraccounnt, setValueUseraccount] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const handleUserAccount = (e) => {
    setValueUseraccount(e.target.value);
  };
  const handlepassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  console.log(valueUseraccounnt, password, phone, email);
  return (
    <form
      id="register  "
      className="h-screen flex flex-col justify-center items-center bg-gray-300"
    >
      <div
        className="flex flex-col gap-y-[10px] h-[300px] justify-center w-96 
                bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400
                hover:from-gray-400 hover:via-gray-300 hover:to-gray-200
                items-center rounded-2xl shadow-md
                transition-colors duration-500 ease-in-out"
      >
        <h1 className="text-2xl font-extrabold text-center">Đăng kí</h1>
        <div className="relative">
          <VscAccount className="absolute top-1 left-1 text-gray-500" />
          <input
            type="text"
            className="border pl-6 rounded-lg outline-none required placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 hover:cursor-pointer font-extralight"
            placeholder="Nhập tài khoản...."
            required
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
            onChange={handlepassword}
          />
        </div>
        <div className="relative">
          <CiPhone className="absolute top-1 left-1 text-gray-500" />
          <input
            type="phone"
            className="border pl-6 rounded-lg outline-none required placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 hover:cursor-pointer font-extralight"
            placeholder="Nhập số điện thoại..."
            required
            onChange={handlePhone}
          />
        </div>
        <div className="relative">
          <TfiEmail className="absolute top-1 left-1 text-gray-500" />
          <input
            type="email"
            name=""
            id=""
            className="border pl-6 rounded-lg outline-none required placeholder:text-[12px] placeholder:font-normal placeholder:text-gray-500 hover:cursor-pointer font-extralight"
            placeholder="Nhập địa chỉ email... "
            required
            onChange={handleEmail}
          />
        </div>
        <div className="flex justify-center gap-x-[10px]">
          <button
            className="text-[10px] border w-[50px] py-[3px] rounded-lg hover:text-red-500 duration-300 transition-colors ease-in-out hover:cursor-pointer"
            type="button"
          >
            Thoát
          </button>
          <button
            className="text-[10px] border  w-[50px] py-[3px] rounded-lg hover:text-blue-500 duration-300 transition-colors ease-in-out hover:cursor-pointer"
            type="submit"
            onClick={() => {
              setValueUseraccount("");
              setPassword("");
              setEmail("");
              setPhone("");
            }}
          >
            Đăng kí
          </button>
        </div>
        <h1 className="text-[10px] font-medium" style={{color : "red"}}>
          Đăng nhập bằng phương thức khác
        </h1>
        <div className="flex gap-x-[30px] justify-between items-center">
          <FcGoogle
            className="hover:cursor-pointer"
            onClick={() => {
              window.location.href =
                "http://localhost:8080/authentication/google";
            }}
          />
          <FaFacebook className="text-blue-500 hover:cursor-pointer" />
        </div>
      </div>
    </form>
  );
};

export default FormRegister;
