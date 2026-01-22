import React from "react";

const toppingList = [
  { id: 1, name: "Trân châu đen", price: 5000 },
  { id: 2, name: "Thạch cà phê", price: 7000 },
  { id: 3, name: "Kem cheese", price: 10000 },
];

const ToppingSelector = ({ toppings, setToppings }) => {
  const toggle = (top) => {
    if (toppings.includes(top)) {
      setToppings(toppings.filter((t) => t !== top));
    } else {
      setToppings([...toppings, top]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Topping thêm</h3>
      <div className="grid grid-cols-2 gap-4">
        {toppingList.map((t) => (
          <label key={t.id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={toppings.includes(t)}
              onChange={() => toggle(t)}
              className="w-5 h-5"
            />
            <span>
              {t.name} (+{t.price}đ)
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ToppingSelector;
