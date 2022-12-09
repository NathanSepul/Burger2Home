import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button from '@mui/material/Button';

import "./PaymentForm.css";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    setIsProcessing(false);

  };

  return (
    <form className="paymentForm" >
      <PaymentElement id="payment-element" />
      <Button onClick={handleSubmit} disabled={isProcessing}> 
        Payer
      </Button>
    </form>
  );
}

export default PaymentForm 