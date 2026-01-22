import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7ede2]">
      <h1 className="text-3xl font-bold text-green-600">
        Thanh toán thành công 🎉
      </h1>
      <p className="mt-2 text-gray-600">
        Mã đơn: <b>{state?.orderCode}</b>
      </p>
      <p className="mt-1">
        Số tiền: <b>{state?.totalPrice?.toLocaleString()} đ</b>
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Tự động quay về trang chủ sau 3 giây...
      </p>
    </div>
  );
};

export default PaymentSuccess;
