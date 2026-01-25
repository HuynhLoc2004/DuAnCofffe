import { motion, AnimatePresence } from "framer-motion";
import ProductList from "../Components/Components_Header/ProductList";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";
import axiosClient from "../AxiosClient";
const categories = [
  { key: "", label: "Tất cả" },
  { key: "coffee", label: "Cà phê" },
  { key: "milk-tea", label: "Trà sữa" },
  { key: "cake", label: "Bánh ngọt" },
  { key: "americano", label: "Americano" },
];

const urlApi = {
  coffee: "/product/getProducts?category=coffee",
  "milk-tea": "/product/getProducts?category=milk-tea",
  cake: "/product/getProducts?category=cake",
  americano: "/product/getProducts?category=americano",
};

const ProductPage = () => {
  const [option, setOption] = useState("");
  localStorage.setItem(
    "page_before",
    window.location.pathname + window.location.search,
  );
  const [infoUser, setInfoUser] = useState(null);

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
    <>
      <Navbar userInfo={infoUser} />
      <div className="min-h-screen bg-[#faf7f2]">
        {/* 🌿 HERO */}
        <section className="relative pt-28 pb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif text-[#3b2a20]"
          >
            Thực đơn
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-gray-600"
          >
            Từ cà phê thủ công, trà sữa ngọt dịu đến bánh ngọt tinh tế – mỗi món
            đều mang một câu chuyện riêng.
          </motion.p>
        </section>

        {/* 🍂 FILTER */}
        <section className="flex justify-center gap-4 flex-wrap mb-20">
          {categories.map((item) => (
            <button
              key={item.key}
              onClick={() => setOption(item.key)}
              className={`
              px-6 py-2 rounded-full text-sm font-medium
              transition-all duration-300
              ${
                option === item.key
                  ? "bg-[#3b2a20] text-white shadow-lg scale-105"
                  : "bg-white text-[#3b2a20] hover:bg-[#d6a46c]/20"
              }
            `}
            >
              {item.label}
            </button>
          ))}
        </section>

        {/* 🧾 PRODUCTS */}
        <section className="max-w-7xl mx-auto px-4 pb-32">
          <AnimatePresence mode="wait">
            {/* ALL */}
            {option === "" && (
              <motion.div
                key="all"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-24"
              >
                {Object.entries(urlApi).map(([key, api]) => (
                  <div key={key} className="flex flex-col gap-10">
                    <h2 className="text-center text-3xl font-serif text-[#3b2a20]">
                      {categories.find((c) => c.key === key)?.label}
                    </h2>
                    <ProductList urlApi={api} />
                  </div>
                ))}
              </motion.div>
            )}

            {/* SINGLE CATEGORY */}
            {option !== "" && (
              <motion.div
                key={option}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-10"
              >
                <h2 className="text-center text-3xl font-serif text-[#3b2a20]">
                  {categories.find((c) => c.key === option)?.label}
                </h2>
                <ProductList urlApi={urlApi[option]} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
};

export default ProductPage;
