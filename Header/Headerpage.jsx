import React, { useState } from "react";
import Banner from "../Components/Components_Header/Banner";
import Content from "../Components/Components_Header/Content";
import Marquee from "../Components/Components_Header/Marquee";
import HeaderHero from "../Components/Components_Header/HeaderHero";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import axiosClient from "../AxiosClient";
const HeaderPage = () => {
  localStorage.setItem(
    "page_before",
    window.location.pathname + window.location.search,
  );
  const [infoUser, setInfoUser] = useState(null);
  const location = useLocation();
  console.log(infoUser);
  useEffect(() => {
    axiosClient
      .get("/auth/info", {
        withCredentials: true,
      })
      .then((res) => {
        setInfoUser({
          fullname: res.data.result.fullname,
          picture: res.data.result.picture,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="text-[#3B2F2F]">
      <Navbar userInfo={infoUser} />
      <HeaderHero />
      <Marquee />
      <Content />
    </div>
  );
};

export default HeaderPage;
