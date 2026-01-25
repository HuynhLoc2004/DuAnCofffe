import React from "react";
import Banner from "../Components/Components_Header/Banner";
import Content from "../Components/Components_Header/Content";
import Marquee from "../Components/Components_Header/Marquee";
import HeaderHero from "../Components/Components_Header/HeaderHero";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
const HeaderPage = () => {
  localStorage.setItem(
    "page_before",
    window.location.pathname + window.location.search,
  );
  return (
    <div className="text-[#3B2F2F]">
      <Navbar />
      <HeaderHero />
      <Marquee />
      <Content />
    </div>
  );
};

export default HeaderPage;
