import React from "react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Footter from "../Components/Footter";
const LayoutMain = () => {
   
  return (
    <div>
      <Outlet />
      <Footter />
    </div>
  );
};

export default LayoutMain;
