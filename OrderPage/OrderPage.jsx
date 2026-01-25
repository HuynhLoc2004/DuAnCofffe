import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import OrderSummary from "../Components/ComponentOrder/OrderSummary";
import SizeSelector from "../Components/ComponentOrder/SizeSelector";
import ToppingSelector from "../Components/ComponentOrder/ToppingSelector";
import QuantitySelector from "../Components/ComponentOrder/QuantitySelector";
import OrderForm from "../Components/ComponentOrder/OrderForm";
import axiosClient from "../AxiosClient";
import Navbar from "../Components/Navbar";

const NAV_HEIGHT = 72;

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
  useEffect(() => {
    axiosClient.get(`product/getProductById?id=${product_id}`).then((res) => {
      console.log(res.data);
      setProduct(res.data.result);
    });
  }, [product_id]);
  // ✅ Tính tổng tiền (memo cho gọn)
  const totalPrice = useMemo(() => {
    if (!product) return -1;

    const basePrice = product.price || 0;
    const sizeExtra = SIZE_PRICE[_size] || 0;
    const toppingExtra = toppings.length * TOPPING_PRICE;

    return (basePrice + sizeExtra + toppingExtra) * quantity;
  }, [product, _size, toppings, quantity]);

  // ❌ Không có sản phẩm (render loading / empty state)
  if (totalPrice == -1) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Không có sản phẩm được chọn 😢
      </div>
    );
  }
  return (
    <>
      <Navbar userInfo={infoUser} />
      <div
        className="min-h-screen bg-[#f7ede2]"
        style={{ paddingTop: NAV_HEIGHT }}
      >
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-5xl bg-[#fffaf3] rounded-2xl shadow-xl overflow-hidden"
          >
            {/* ===== HEADER ===== */}
            <div className="px-8 py-6 border-b border-[#e6d8c8]">
              <h1 className="text-2xl font-semibold text-[#3b2a20]">
                {product.name}
              </h1>
              <p className="text-sm text-[#7a5c48]">
                Tuỳ chỉnh đơn hàng của bạn
              </p>
            </div>

            {/* ===== BODY ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6">
              {/* LEFT */}
              <div className="md:col-span-2 space-y-6">
                <Section title="Sản phẩm">
                  <OrderSummary product={product} />
                </Section>

                {product.category != "cake" && (
                  <Section title="Chọn size">
                    <SizeSelector
                      _size={_size}
                      setSize={setSize}
                      listSize={product.sizeEntitySet}
                    />
                  </Section>
                )}

                {product.category != "cake" && (
                  <Section title="Topping">
                    <ToppingSelector
                      toppings={toppings}
                      setToppings={setToppings}
                    />
                  </Section>
                )}
                <Section title="Số lượng">
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </Section>
              </div>

              {/* RIGHT */}
              <div>
                <OrderForm
                  product={product}
                  size={_size}
                  toppings={toppings}
                  quantity={quantity}
                  totalPrice={totalPrice}
                />
              </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="px-8 py-5 border-t border-[#e6d8c8] bg-[#f3e6d6]">
              <button
                className="w-full py-3 rounded-xl bg-[#3b2a20] text-white font-semibold hover:bg-[#c89b6d] transition"
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
              >
                Thanh toán ({totalPrice.toLocaleString()}đ)
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

/* ===== SECTION ===== */
const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h2 className="mb-3 font-medium text-[#3b2a20]">{title}</h2>
    {children}
  </div>
);
