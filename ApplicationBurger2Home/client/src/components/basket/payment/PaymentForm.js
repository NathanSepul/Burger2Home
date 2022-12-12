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
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {

    // e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);


    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
    });

    if (error.code === "invalid_owner_name"){
      setMessage("Veillez à entrer le Prénom et le Nom");
    }

    console.log(error)
    // if (result.error) {
    //   console.log(result.error)
    // }
    // else {
    //   console.log("it work")
    //   dispatch(removeAll)
    // }

    setIsProcessing(false);

  };

  return (
    // <form className="paymentForm" action="/create-checkout-session" method="POST">
    //   <PaymentElement id="payment-element" />
    //   <Button onClick={handleSubmit} >
    //     Payer
    //   </Button>
    // </form>

    <div className="paymentForm">
      <PaymentElement />
      <br/>
      <Button onClick={handleSubmit} className="paymentButton" disabled={isProcessing}>
        {isProcessing ? "Action en cours ... " : "Payer"}
      </Button>

      {message && <div className="payment-message">{message}</div>}
    </div>
  );
}

export default PaymentForm 