import { motion } from "framer-motion";
import ProductList from "./ProductList";
import SideBar from "./SideBar";
import srcCake from "../../assets/BannerIMG/Cake_5.png";
import ExperienceSection from "./ExperienceSection";
const Content = () => {
  const urlApi = {
    coffee: "/product/getTopProductByCategory?size=6&category=coffee",
    milkTea: "/product/getTopProductByCategory?size=6&category=milk-tea",
  };

  return (
    <div className="w-full bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col gap-24">
        {/* COFFEE */}
        <motion.section
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-4xl font-serif uppercase">Coffee</h1>
          <p className="text-center max-w-2xl mx-auto mt-4 text-gray-600">
            Nơi cà phê được pha chậm, giữ trọn hương vị nguyên bản và mang đến
            cảm giác bình yên.
          </p>

          <div className="relative z-0 mt-14">
            <ProductList urlApi={urlApi.coffee} />
          </div>
        </motion.section>

        {/* MILK TEA */}
        <motion.section
          className="relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-center text-4xl font-serif uppercase">Trà sữa</h1>
          <p className="text-center max-w-2xl mx-auto mt-4 text-gray-600">
            Vị ngọt béo hòa cùng hương trà thơm dịu, mang lại sự sảng khoái nhẹ
            nhàng.
          </p>

          <div className="relative z-0 mt-14">
            <ProductList urlApi={urlApi.milkTea} />
          </div>
        </motion.section>

        <SideBar img={{ srcCake }} />
        <ExperienceSection />
      </div>
    </div>
  );
};

export default Content;
