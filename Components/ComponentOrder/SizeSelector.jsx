import React from "react";

const sizes = [
  { id: "S", label: "Small", extra: 0 },
  { id: "M", label: "Medium", extra: 5000 },
  { id: "L", label: "Large", extra: 10000 },
];

const SizeSelector = ({ _size, setSize, listSize }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Chọn size</h3>
      <div className="flex gap-4">
        {listSize.map((item) => (
          <button
            key={item.id}
            onClick={() => setSize(item.size)}
            className={`px-5 py-3 rounded-xl border transition-all
${item.size === _size ? "bg-amber-600 text-white" : "hover:bg-amber-100"}`}
          >
            {item.size} {item.price_size > 0 && `(+${item.price_size}đ)`}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
