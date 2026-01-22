import React from "react";
import { Coffee } from "lucide-react";

const OrderSummary = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-6">
      <img
        src={product.img}
        alt={product.name}
        className="w-32 h-32 object-cover rounded-xl"
      />
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Coffee className="text-amber-600" /> {product.name}
        </h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-amber-700 mt-3">
          {(product?.price ?? 0).toLocaleString()} đ
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
