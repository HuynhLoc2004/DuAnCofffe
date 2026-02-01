import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import SizeSelector from "../Components/ComponentOrder/SizeSelector";
import ToppingSelector from "../Components/ComponentOrder/ToppingSelector";
import QuantitySelector from "../Components/ComponentOrder/QuantitySelector";
import axiosClient from "../AxiosClient";
import Navbar from "../Components/Navbar";
import { unlogout, logout, getLogout } from "../ManagerLogout/ManagerLogout";
import {
  getAccessToken,
  setAccessToken,
} from "../ManagerAccessToken/ManagerAccessToken";
const NAV_HEIGHT = 72;

import { head } from "lodash";

const SIZE_PRICE = {
  S: 0,
  M: 5000,
  L: 8000,
};

const TOPPING_PRICE = 5000;

const OrderPage = () => {
  const [searchParam] = useSearchParams();
  const product_id = searchParam.get("id");
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [_size, setSize] = useState("S");
  const [toppings, setToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [infoUser, setInfoUser] = useState(null);
  const [accessToken, setAccesstoken] = useState(getAccessToken());
  const [showSuccess, setShowSuccess] = useState(false);
  const [availableToppings, setAvailableToppings] = useState([]);

  // Reset quantity to 1 when size changes
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    setQuantity(1); // Reset quantity to 1
  };

  // Format date to dd/MM/yyyy
  const formatDateISO = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleAddToCart = () => {
    const cartRequest = {
      productId: product.id,
      size: _size,
      toppingIds: toppings.map((t) => t.id),
      quantity,
      totalPrice,
      createdAt: formatDateISO(new Date()),
    };
    axiosClient
      .post(`/cart/createCart`, cartRequest, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        if (res.data.statusCode == 200) {
          console.log(res.data.result);
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 2000);
        }
      })
      .catch((err) => {
        if (err.status == 401) {
          console.log(err);
        } 
      });
  };
  useEffect(() => {
    localStorage.setItem(
      "page_before",
      window.location.pathname + window.location.search,
    );
  });
  useEffect(() => {
    axiosClient
      .get("/auth/info", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          withCredentials: getLogout() == 1 ? true : false,
        },
      })
      .then((res) => {
        setInfoUser({
          fullname: res.data.result.fullname,
          picture: res.data.result.picture,
        });
      })
      .catch((err) => {
        if (err.status == 401) {
          axiosClient
            .get("/auth/refresh_token", {
              withCredentials: true,
            })
            .then((res) => {
              if (res.data.statusCode == 401) {
                return;
              }
              unlogout();
              setAccessToken(res.data.result.accessToken);
              setAccesstoken(res.data.result.accessToken);
            });
        }
      });
  }, [accessToken]);

  useEffect(() => {
    axiosClient
      .get(`product/getProductById?id=${product_id}`)
      .then((res) => {
        if (res.data.statusCode == 200) {
          setAvailableToppings(res.data.result.toppingEntities || []);
          setProduct(res.data.result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [product_id]);

  const totalPrice = useMemo(() => {
    if (!product) return -1;
    const basePrice = product.price || 0;
    const sizeExtra = SIZE_PRICE[_size] || 0;
    const toppingExtra = toppings.length * TOPPING_PRICE;
    return (basePrice + sizeExtra + toppingExtra) * quantity;
  }, [product, _size, toppings, quantity]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Đang tải sản phẩm...
      </div>
    );
  }

  return (
    <>
      <Navbar userInfo={infoUser} />
      <div
        className="min-h-screen bg-gray-50"
        style={{ paddingTop: NAV_HEIGHT }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl mx-auto"
          >
            {/* MAIN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* LEFT - PRODUCT IMAGE AND DETAILS */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex flex-col sticky top-24"
              >
                <div
                  className="relative w-full overflow-hidden rounded-3xl mb-6 bg-gradient-to-br from-slate-100 to-gray-200 shadow-lg"
                  style={{ aspectRatio: "1" }}
                >
                  <motion.img
                    animate={{
                      rotateY: [0, 90, 180, 270, 360],
                      translateY: ["0%", "2%", "0%", "-2%", "0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain p-8"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <p className="text-base text-gray-600 max-w-md mx-auto">
                    {product.description}
                  </p>
                  <div className="pt-2">
                    <p className="text-sm text-gray-500">Giá từ</p>
                    <p className="text-5xl font-extrabold text-black">
                      {(product?.price ?? 0).toLocaleString()}đ
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT - CUSTOMIZATION & CHECKOUT */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col space-y-8"
              >
                {/* Customization Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                    Tùy Chỉnh
                  </h2>

                  {product.category !== "cake" && (
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        📏 Chọn Size
                      </label>
                      <SizeSelector
                        _size={_size}
                        setSize={handleSizeChange}
                        listSize={product.sizeEntitySet}
                      />
                    </div>
                  )}

                  {product.category !== "cake" && (
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-3">
                        ✨ Thêm Topping
                      </label>
                      <div className="bg-slate-50 rounded-xl p-4 h-48 overflow-y-auto border">
                        <ToppingSelector
                          availableToppings={availableToppings}
                          selectedToppings={toppings}
                          setSelectedToppings={setToppings}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-lg font-semibold text-gray-900 mb-3">
                      🛒 Số lượng
                    </label>
                    <QuantitySelector
                      quantity={quantity}
                      setQuantity={setQuantity}
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
                    Tóm Tắt Đơn Hàng
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Giá sản phẩm:</span>
                      <span className="font-medium text-gray-900">
                        {((product.price || 0) * quantity).toLocaleString()}đ
                      </span>
                    </div>
                    {toppings.length > 0 && (
                      <div className="flex justify-between text-base">
                        <span className="text-gray-600">Topping:</span>
                        <span className="font-medium text-gray-900">
                          {(
                            toppings.length *
                            TOPPING_PRICE *
                            quantity
                          ).toLocaleString()}
                          đ
                        </span>
                      </div>
                    )}
                    {_size !== "S" && (
                      <div className="flex justify-between text-base">
                        <span className="text-gray-600">Phụ thu Size ({_size}):</span>
                        <span className="font-medium text-gray-900">
                          {(SIZE_PRICE[_size] * quantity).toLocaleString()}đ
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between text-2xl font-bold pt-4 border-t-2 border-dashed">
                    <span>Tổng cộng:</span>
                    <span className="text-green-600">
                      {totalPrice.toLocaleString()}đ
                    </span>
                  </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center text-base font-semibold text-green-700"
                  >
                    ✅ Thêm vào giỏ hàng thành công!
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          product,
                          _size,
                          toppings,
                          quantity,
                          totalPrice,
                          orderCode: `DH${Date.now()}`,
                        },
                      })
                    }
                    className="w-full py-4 text-lg rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold shadow-lg hover:shadow-xl transition-all"
                  >
                    💳 Thanh toán ngay
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="w-full py-3 rounded-xl bg-black text-white font-bold shadow-md hover:shadow-lg transition-all"
                  >
                    🛒 Thêm vào giỏ
                  </motion.button>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1 }}
                    onClick={() => navigate("/")}
                    className="w-full py-3 rounded-xl text-gray-600 font-semibold hover:bg-gray-100 transition-all"
                  >
                    ← Quay lại trang chủ
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
