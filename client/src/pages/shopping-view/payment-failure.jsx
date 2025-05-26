import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentFailurePage() {
  const navigate = useNavigate();

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl text-red-600">Payment Failed!</CardTitle>
      </CardHeader>
      <Button className="mt-5" onClick={() => navigate("/shop/checkout")}>
        Try Again
      </Button>
    </Card>
  );
}

export default PaymentFailurePage;