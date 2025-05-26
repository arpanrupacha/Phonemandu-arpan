import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewOrder } from "@/store/shop/order-slice";

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there is a pending eSewa order
    const pendingOrder = localStorage.getItem("pendingOrder");
    if (pendingOrder) {
      const orderData = JSON.parse(pendingOrder);
      dispatch(createNewOrder(orderData)).then(() => {
        localStorage.removeItem("pendingOrder");
      });
    }
  }, [dispatch]);

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Payment is successfull!</CardTitle>
      </CardHeader>
      <Button
        className="mt-5"
        onClick={() => navigate("/shop/account?tab=orders")}
      >
        View Orders
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;
