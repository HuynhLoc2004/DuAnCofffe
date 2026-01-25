import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/BannerIMG/Logo.png";
import { Link } from "react-router-dom";
import { CiBurger, CiSearch } from "react-icons/ci";
import { BsCart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import ScrollFloat from "../component/ScrollFloat";
import { CiMenuBurger } from "react-icons/ci";
import "../index.css";
import { gsap } from "gsap";
import StaggeredMenu from "../component/StaggeredMenu";
import { TfiClose } from "react-icons/tfi";
import axiosClient from "../AxiosClient";
import debounce from "lodash/debounce";
const Navbar = () => {
  const menus = ["Trang chủ", "Orders", "Tin tức", "VIP", "Liên hệ"];
  const menus_drops = ["Cafe", "Trà sữa", "Cake", "Americano"];
  const text = "Nhập món bạn cần tìm...";
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [valuesearch, setValueSearch] = useState("");
  const [openbarMenu, setOpenbarMenu] = useState(false);
  const [itemSearch, setItemSeach] = useState([]);
  const [focus, setFocus] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const HandlevalueInput = (e) => {
    if (e.target.value == "") {
      setPlaceholder("");
      setIndex(0);
      setValueSearch("");
    } else {
      setValueSearch(e.target.value);
      setIndex((index) => text.length + 1);
    }
  };

  useEffect(() => {
    if (index == text.length) {
      setPlaceholder("");
      setIndex(0);
    } else if (index > text.length) {
      return;
    }
    const interval = setInterval(() => {
      setPlaceholder((prev) => prev + text[index]);
      setIndex((i) => i + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [placeholder]);

  const callApiSearch = () => {
    axiosClient
      .get(`product/getTOpProductbySearch?top=5&searchname=${valuesearch}`)
      .then((res) => {
        console.log(res.data.result);
        setItemSeach(res.data.result);
      })
      .catch((err) => {
        console.log("không call dc api");
      });
  };
  const debounceSearch = useCallback(debounce(callApiSearch, 500), [
    valuesearch,
  ]);
  useEffect(() => {
    debounceSearch();
    return () => {
      debounceSearch.cancel();
    };
  }, [valuesearch]);

  //
  useEffect(() => {
    setValueSearch("");
    setFocus(false);
  }, [pathname]);

  return (
    <>
      <nav className="flex justify-between md:justify-around px-2 min-h-[50px] items-center font-extrabold flex-wrap   w-full  fixed  top-0 z-50 bg-white/30 backdrop-blur-md">
        <div id="logo" className="shrink-0 bg-transparent">
          <Link to={"/"}>
            <img
              src={Logo}
              alt=""
              width={50}
              className="rounded-3xl hover:scale-105 transform transition-transform duration-200 ease-in-out"
            />
          </Link>
        </div>
        <div id="menu" className="hidden md:block">
          <ul className="flex gap-x-[30px]">
            <Link to="/">
              <li className="hover:opacity-60  hover:scale-110 transform transition-transform duration-200 ease-in-out">
                {menus[0]}
              </li>
            </Link>
            <Link to="/product">
              <li className="relative group">
                <span className="hover:opacity-50 hover:scale-110 transition">
                  {menus[1]}
                </span>
              </li>
            </Link>
            <Link>
              <li className="hover:opacity-60  hover:scale-110 transform transition-transform duration-200 ease-in-out">
                {menus[2]}
              </li>
            </Link>
            <Link>
              <li className="hover:opacity-60  hover:scale-110 transform transition-transform duration-200 ease-in-out">
                {menus[3]}
              </li>
            </Link>
            <Link>
              <li className="hover:opacity-60 hover:scale-110 transform transition-transform duration-200 ease-in-out">
                {menus[4]}
              </li>
            </Link>
          </ul>
        </div>
        <div id="search" className="flex relative hidden md:block">
          <input
            type="text"
            placeholder={placeholder}
            className="border rounded-sm text-[13px] px-3 outline-0 hover:cursor-pointer "
            onChange={HandlevalueInput}
            value={valuesearch}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setTimeout(() => setFocus(false), 150);
            }}
          />
          <CiSearch className="absolute right-1 top-[5px] hover:cursor-pointer hover:scale-110 transform transition-transform duration-200 ease-in-out" />
          <div
            className={`bg-white w-full absolute top-full z-50 transform transition-all duration-200 ease-out ${
              itemSearch.length > 0 && focus
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 -translate-y-2 scale-80 pointer-events-none"
            } `}
          >
            {itemSearch.length > 0 &&
              itemSearch.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`flex gap-x-3  hover:cursor-pointer transform hover:scale-105 py-[10px] h-full px-2 border-b-1 duration-300 ease-in-out transition-all`}
                    onMouseDown={() => {
                      navigate(
                        `/order/?category=${item.category}&id=${item.id}`,
                      );
                    }}
                  >
                    <img src={item.img} className="object-cover" width={20} />
                    <p>{item.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div id="user" className="flex gap-x-2 relative">
          <Link className="hidden md:block">
            <BsCart />
          </Link>
          <Link to={"/login"} className="hidden md:block">
            <FaRegUser />
          </Link>
          <CiMenuBurger
            className={`md:hidden ${
              openbarMenu ? "hidden" : "block"
            }  hover:cursor-pointer`}
            onClick={() => {
              setOpenbarMenu(!openbarMenu);
            }}
          />
          <TfiClose
            className={`md:hidden ${
              openbarMenu ? "block" : "hidden"
            } hover:cursor-pointer`}
            onClick={() => {
              setOpenbarMenu(!openbarMenu);
            }}
          />
        </div>
      </nav>
      <div
        className={`h-[100vh]  fixed bg-gray-500/20 backdrop-blur-sm
  right-0 top-[50px] font-serif text-lg md:w-[150px] md:transform md:translate-x-[150px] z-40 ${
    openbarMenu
      ? "-translate-x-[0]  transform transition-transform duration-500 ease-out w-[100%] sm:w-[50%] py-5 md:py-0"
      : "translate-x-[150px]  transform transition-transform duration-500 ease-out"
  }`}
      >
        <ul className="text-right pr-3">
          {menus.map((item) => {
            return (
              <Link>
                <li>{item}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
