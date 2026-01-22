import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
      <h3 className="text-lg font-semibold">Số lượng</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-2 rounded-lg bg-gray-200"
        >
          -
        </button>
        <span className="text-xl font-bold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
