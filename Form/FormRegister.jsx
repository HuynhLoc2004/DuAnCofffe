import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import { CiPhone } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { data, Link, useNavigate } from "react-router-dom";
import axiosClient from "../AxiosClient";
const FormRegister = () => {
  const [valueUseraccounnt, setValueUseraccount] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const handleUserAccount = (e) => setValueUseraccount(e.target.value);
  const handlepassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleFullName = (e) => setFullName(e.target.value);
  const handleBirthdate = (e) => setBirthdate(e.target.value);
  const PHONE_REGEX = /^(\+84|84)9\d{8}$/;
  const ACCOUNT_REGEX = /^[a-zA-Z0-9]+$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const BIRTHDATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  const navigate = useNavigate();
  const handleValidForm = (e) => {
    // abc
    if (valueUseraccounnt !== "") {
      const accountTrim = valueUseraccounnt.trim();
      if (!ACCOUNT_REGEX.test(accountTrim)) {
        alert("Tài khoản không được có khoảng trắng và không có chữ có dấu");
        setValueUseraccount("");
        return;
      }
    } else {
      alert("tài khoản không được bỏ trống");
      return;
    }

    if (password == "") {
      alert("mật khẩu không được bỏ trống");
      return;
    } else {
    }

    if (email == "") {
      alert("email không được bỏ trống");
      return;
    } else {
      const emailTrim = email.trim();
      if (EMAIL_REGEX.test(emailTrim)) {
      } else {
        alert("Email không đúng định dạng. Vui lòng kiểm tra lại. ");
        setEmail("");
        return;
      }
    }
    if (fullName == "") {
      alert("Tên không được bỏ trống");
      return;
    } else {
    }

    if (phone == "") {
    } else {
      const phoneTrim = phone.trim();
      if (PHONE_REGEX.test(phoneTrim)) {
      } else {
        alert(
          "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (VD: 098xxxxxxx).",
        );
        setPhone("");
        return;
      }
    }

    const date = new Date();
    const date_birth = new Date(birthdate);
    if (birthdate == "") {
    } else {
      if (BIRTHDATE_REGEX.test(birthdate)) {
        if (date_birth > date) {
          alert("Ngày sinh không lớn hơn ngày hiện tại");
          setBirthdate("");
          return;
        }
      } else {
        alert("Ngày sinh không hợp lệ");
        setBirthdate("");
        return;
      }
    }
    const DataRegistry = {
      account: valueUseraccounnt.trim(),
      password: password.trim() !== "" ? password : null,
      email: email.trim() !== "" ? email.trim() : null,
      phone: phone.trim() !== "" ? phone.trim() : null,
      fullname: fullName.trim() !== "" ? fullName.trim() : null,
      date: birthdate !== "" ? birthdate : null,
    };

    axiosClient
      .post("/user/registry", DataRegistry)
      .then((res) => {
        if (res.data.statusCode == 400) {
          alert(res.data.message + "!!!");
          return;
        }
        setTimeout(() => {
          alert("đăng kí tài khoản thành công");
        }, 100);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
      });
    setBirthdate("");
    setEmail("");
    setFullName("");
    setPhone("");
    setPassword("");
    setValueUseraccount("");
  };

  return (
    <form className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <div
        className="flex flex-col gap-y-3 min-h-[420px] w-full max-w-[420px] max-h-[90vh] p-6
          bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400
          hover:from-gray-400 hover:via-gray-300 hover:to-gray-200
          items-center rounded-2xl shadow-md
          transition-colors duration-500 ease-in-out overflow-y-auto"
      >
        <h1 className="text-2xl font-extrabold text-center mt-2">Đăng kí</h1>

        {/* Tài khoản */}
        <div className="relative">
          <VscAccount className="absolute top-2 left-2 text-gray-500" />
          <input
            type="text"
            className="border pl-8 h-[32px] w-[260px] rounded-lg outline-none placeholder:text-[12px]"
            placeholder="Nhập tài khoản..."
            required
            onChange={handleUserAccount}
            value={valueUseraccounnt}
            autoComplete="username"
          />
          <p className="text-red-600 text-[12px] mt-0.5">* Bắt buộc nhập</p>
        </div>

        {/* Mật khẩu */}
        <div className="relative">
          <TbLockPassword className="absolute top-2 left-2 text-gray-500" />
          <input
            type="password"
            className="border pl-8 h-[32px] w-[260px] rounded-lg outline-none placeholder:text-[12px]"
            placeholder="Nhập mật khẩu..."
            required
            value={password}
            onChange={handlepassword}
            autoComplete="new-password"
          />
          <p className="text-red-600 text-[12px] mt-0.5">* Bắt buộc nhập</p>
        </div>

        {/* Email */}
        <div className="relative">
          <TfiEmail className="absolute top-2 left-2 text-gray-500" />
          <input
            type="email"
            className="border pl-8 h-[32px] w-[260px] rounded-lg outline-none placeholder:text-[12px]"
            placeholder="Nhập địa chỉ email..."
            required
            onChange={handleEmail}
            value={email}
          />
          <p className="text-red-600 text-[12px] mt-0.5">* Bắt buộc nhập</p>
        </div>

        {/* ===== 3 dòng cuối ===== */}

        {/* Họ và tên */}
        <div className="relative">
          <VscAccount className="absolute top-2 left-2 text-gray-500" />
          <input
            type="text"
            className="border pl-8 h-[32px] w-[260px] rounded-lg outline-none placeholder:text-[12px]"
            placeholder="Họ và tên (tùy chọn)"
            onChange={handleFullName}
            value={fullName}
          />
          <p className="text-red-600 text-[12px] mt-0.5">*Bắt buộc</p>
        </div>
        {/* Số điện thoại */}
        <div className="relative">
          <CiPhone className="absolute top-2 left-2 text-gray-500" />
          <input
            type="tel"
            className="border pl-8 h-[32px] w-[260px] rounded-lg outline-none placeholder:text-[12px]"
            placeholder="Số điện thoại (tùy chọn)"
            onChange={handlePhone}
            value={phone}
          />
          <p className="text-red-600 text-[12px] mt-0.5">* Không bắt buộc</p>
        </div>

        {/* Ngày sinh */}
        <div className="relative">
          <input
            type="date"
            className="border pl-3 h-[32px] w-[260px] rounded-lg outline-none"
            onChange={handleBirthdate}
            value={birthdate}
          />
          <p className="text-red-600 text-[12px] mt-0.5">* Không bắt buộc</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-x-[14px] mt-2">
          <Link to={"/"}>
            <button
              type="button"
              className="text-[11px] border w-[60px] py-[4px] rounded-lg hover:text-red-500 transition"
            >
              Thoát
            </button>
          </Link>

          <button
            type="button"
            className="text-[11px] border w-[60px] py-[4px] rounded-lg hover:text-blue-500 transition"
            onClick={() => {
              handleValidForm();
            }}
          >
            Đăng kí
          </button>
        </div>

        <h1 className="text-[10px] font-medium text-red-600 mt-1">
          Đăng nhập bằng phương thức khác
        </h1>

        <div className="flex gap-x-[30px] mb-3">
          <FcGoogle
            className="hover:cursor-pointer"
            onClick={() => {
              localStorage.setItem(
                "page_before_login",
                window.location.pathname + window.location.search,
              );
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

export default FormRegister;
