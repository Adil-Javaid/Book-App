import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./payment.css";

// Initialize Stripe
const stripePromise = loadStripe("your-public-stripe-key");

const Payment: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });

    setIsProcessing(false);

    if (error) {
      setMessage(`Payment failed: ${error.message}`);
      console.error(error);
    } else {
      setMessage("Payment successful! Thank you for your purchase.");
      console.log("Payment successful:", paymentMethod);
      // Handle successful payment, navigate to success page or show confirmation
    }
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement className="card-element" />
        <button
          type="submit"
          className="submit-button"
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <div className="payment-message">{message}</div>}
    </div>
  );
};

const PaymentWrapper: React.FC = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default PaymentWrapper;
