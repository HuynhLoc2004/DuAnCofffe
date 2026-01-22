import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import FormRegister from "./Form/FormRegister";
import LayoutMain from "./Layout/LayoutMain";
import HeaderPage from "./Header/headerpage";
import ProductPage from "./Product/ProductPage";
import OrderPage from "./OrderPage/OrderPage";
import CheckoutPage from "./QRthanhtoan/CheckoutPage";
import PaymentSuccess from "./Components/Paymentsuccess/PaymentSuccess";
import ScrollToTop from "./Scolltoppage";
function App() {
  return (
    <div>
      <ScrollToTop/>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<HeaderPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
        </Route>
        <Route path="/login" element={<FormRegister />}></Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
