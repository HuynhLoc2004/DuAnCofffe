import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../AxiosClient";
import { IoReloadSharp } from "react-icons/io5";
const Authentication = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      axiosClient
        .get("/auth/google", {
          withCredentials: true,
        })
        .then((res) => {
          navigate(localStorage.getItem("page_before"));
        });
    }, 200);
  });
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <p className="text-sm ">Đang xử lí..</p>
      <IoReloadSharp className="text-3xl animate-spin" />
    </div>
  );
};

export default Authentication;
