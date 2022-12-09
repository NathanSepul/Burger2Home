import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Button from '@mui/material/Button';

import { useDispatch } from 'react-redux';
import { removeAll } from '../../../redux/basketSlice.js';
import "./PaymentForm.css";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispattch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {

    // e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);


    const result = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   return_url: `${window.location.origin}/`,
      // },
    });

    console.log(result)
    if (result.error) {
      console.log(result.error)
    }
    else {
      console.log("it work")
      dispattch(removeAll)
    }

    setIsProcessing(false);

  };

  return (
    <form className="paymentForm" >
      <PaymentElement id="payment-element" />
      <Button onClick={handleSubmit} >
        Payer
      </Button>
    </form>
  );
}

export default PaymentForm 