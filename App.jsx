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
import Authentication from "./assets/Authentication/Authentication";
import FormLogin from "./Form/FormLogin";
import LoadingPage from "./LoadingPage/LoadingPage";

function App() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutMain />}>
          <Route path="/" element={<HeaderPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/order" element={<OrderPage />}></Route>
        </Route>
        <Route path="/authentication" element={<Authentication />}></Route>
        <Route path="registry" element={<FormRegister />}></Route>
        <Route path="/login" element={<FormLogin />}></Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/loadingpage" element={<LoadingPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
