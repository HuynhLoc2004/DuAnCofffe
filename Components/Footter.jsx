import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaStar,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-[100px] bg-gray-900 text-gray-200">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* About / Logo */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-purple-500 animate-pulse">
            Trà Sữa Thơm Ngon
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Ly trà sữa béo ngậy, bánh ngọt hấp dẫn, mang đến hương vị ngọt ngào,
            ấm áp cho mọi khoảnh khắc.
          </p>
          <div className="flex space-x-3 text-xl">
            {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-3 bg-gray-800 rounded-full shadow-lg transition transform hover:scale-125 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Menu nhanh</h2>
          <ul className="space-y-2">
            {["Trà Sữa", "Bánh Ngọt", "Americano", "Khuyến Mãi"].map((item) => (
              <li key={item} className="group relative">
                <a className="hover:text-purple-500 transition font-medium relative">
                  {item}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Store Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Cửa hàng</h2>
          <p className="flex items-center gap-2 mb-2 hover:text-purple-500 transition">
            <FaMapMarkerAlt className="text-purple-500" />
            08 Nguyễn Thị Nhu, Củ Chi, TPHCM
          </p>
          <p className="flex items-center gap-2 mb-2 hover:text-purple-500 transition">
            <FaPhoneAlt className="text-purple-500" /> 0123 456 789
          </p>
          <div className="mt-2 flex gap-2">
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-pink-500 rounded-full animate-pulse">
              Hot
            </span>
            <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-purple-500 rounded-full animate-bounce">
              Best Seller
            </span>
          </div>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Hỗ trợ</h2>
          <ul className="space-y-2">
            {[
              "FAQs",
              "Chính sách bảo mật",
              "Điều khoản sử dụng",
              "Hướng dẫn đặt hàng",
            ].map((item) => (
              <li key={item}>
                <a className="hover:text-purple-500 transition font-medium">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews + Payment */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2">Đánh giá</h2>
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} className="hover:animate-pulse" />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Thanh toán</h2>
          <div className="flex space-x-3 text-2xl">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal].map((Icon, idx) => (
              <Icon
                key={idx}
                className="text-gray-400 hover:text-purple-500 transition transform hover:scale-125"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-800 text-gray-400 text-center py-4 text-sm border-t border-gray-700">
        © 2026 Trà Sữa Thơm Ngon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
