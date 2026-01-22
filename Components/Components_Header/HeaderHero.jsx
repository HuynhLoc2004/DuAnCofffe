import React from "react";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

const HeaderHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#2b1a12] via-[#3a2418] to-[#1f130d]">
      {/* background glow */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#d6a46c]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#6b3e2e]/20 rounded-full blur-3xl" />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-serif text-[#f7ede2] leading-tight"
        >
          Coffee & Milk Tea
          <br />
          <span className="text-[#d6a46c]">Chill Every Moment</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-[#e6d5c3]"
        >
          Không chỉ là đồ uống – đây là không gian để bạn chậm lại, thưởng thức
          vị cà phê đậm đà và ly trà sữa ngọt ngào theo cách riêng.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex gap-4"
        >
          <button className="px-8 py-3 rounded-full bg-[#d6a46c] text-black font-semibold hover:bg-[#c08b52] transition">
            Xem menu
          </button>
          <button className="px-8 py-3 rounded-full border border-[#d6a46c] text-[#d6a46c] hover:bg-[#d6a46c]/10 transition">
            Khám phá
          </button>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }} 
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#f7ede2] flex flex-col items-center"
      ></motion.div>
    </section>
  );
};

export default HeaderHero;
