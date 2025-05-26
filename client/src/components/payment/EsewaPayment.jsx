import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const ESEWA_CONFIG = {
  product_code: "EPAYTEST",
  secret: "8gBm/:&EnhH.1/q",
  success_url: "http://localhost:5173/shop/payment-success",
  failure_url: "http://localhost:5173/shop/payment-failure",
};

function generateSignature(total_amount, transaction_uuid, product_code, secret) {
  const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hash = CryptoJS.HmacSHA256(hashString, secret);
  return CryptoJS.enc.Base64.stringify(hash);
}

export default function EsewaPayment({ orderData, disabled }) {
  const [formData, setFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: ESEWA_CONFIG.product_code,
    success_url: ESEWA_CONFIG.success_url,
    failure_url: ESEWA_CONFIG.failure_url,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: ESEWA_CONFIG.secret,
  });

  // Update formData whenever orderData changes
  useEffect(() => {
    if (!orderData || !orderData.totalAmount || orderData.totalAmount <= 0) return;
    const totalAmountStr = String(Math.round(orderData.totalAmount));
    const transaction_uuid = uuidv4();
    const signature = generateSignature(
      totalAmountStr,
      transaction_uuid,
      ESEWA_CONFIG.product_code,
      ESEWA_CONFIG.secret
    );
    setFormData({
      amount: totalAmountStr,
      tax_amount: "0",
      total_amount: totalAmountStr,
      transaction_uuid,
      product_service_charge: "0",
      product_delivery_charge: "0",
      product_code: ESEWA_CONFIG.product_code,
      success_url: ESEWA_CONFIG.success_url,
      failure_url: ESEWA_CONFIG.failure_url,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      signature,
      secret: ESEWA_CONFIG.secret,
    });
  }, [orderData]);

  const handleEsewaSubmit = () => {
    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
  };

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      style={{ marginTop: 16 }}
      onSubmit={handleEsewaSubmit}
    >
      <input type="hidden" name="amount" value={formData.amount} />
      <input type="hidden" name="tax_amount" value={formData.tax_amount} />
      <input type="hidden" name="total_amount" value={formData.total_amount} />
      <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
      <input type="hidden" name="product_code" value={formData.product_code} />
      <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
      <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
      <input type="hidden" name="success_url" value={formData.success_url} />
      <input type="hidden" name="failure_url" value={formData.failure_url} />
      <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
      <input type="hidden" name="signature" value={formData.signature} />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded"
        disabled={disabled || !orderData || !orderData.totalAmount || orderData.totalAmount <= 0}
      >
        Pay via eSewa
      </button>
    </form>
  );
}