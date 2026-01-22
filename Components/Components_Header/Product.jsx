import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Product = ({ ProductItem }) => {
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    navigate(`/order/?category=${ProductItem.category}&id=${ProductItem.id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -14, rotateX: 3, rotateY: -3 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      className="
        relative w-[250px] h-[360px]
        rounded-[28px]
        bg-[#faf7f2]
        shadow-[0_30px_60px_rgba(0,0,0,0.18)]
        overflow-hidden group perspective
      "
    >
      {/* Glow */}
      <div className="absolute -inset-10 bg-gradient-to-br from-[#d6a46c]/20 via-transparent to-[#5a3826]/20 opacity-0 group-hover:opacity-100 blur-2xl transition duration-700" />

      {/* Border */}
      <div className="absolute inset-0 rounded-[28px] ring-1 ring-white/40 pointer-events-none" />

      {/* Image */}
      <motion.div
        className="relative z-10 h-[220px] overflow-hidden"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={ProductItem.img}
          alt={ProductItem.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Info */}
      <div className="relative z-20 px-4 pt-4 text-center">
        <h3 className="font-serif text-xl text-[#3b2a20]">
          {ProductItem.name}
        </h3>

        <div className="flex justify-center gap-2 mt-2">
          <span className="text-sm text-[#3b2a20]">{ProductItem.price}đ</span>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        onClick={handleOrder}
        whileHover={{ scale: 1.12 }}
        className="
          absolute bottom-5 left-1/2 -translate-x-1/2
          px-6 py-2 rounded-full
          bg-[#3b2a20] text-white text-sm
          shadow-lg hover:bg-[#c89b6d]
        "
      >
        Đặt ngay
      </motion.button>
    </motion.div>
  );
};

export default Product;
