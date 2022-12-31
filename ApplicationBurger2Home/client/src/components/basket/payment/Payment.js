import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements, ElementsConsumer,
  CardElement,
} from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm.js"
import Loding from "../../loding/Loding.js"
import axios from "axios";


const Payment = ({ order }) => {

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  const appearance = {
    theme: 'stripe',
    labels: 'floating'
  }

  let options = { clientSecret, appearance }

  useEffect(() => {
    axios.get(`/keys/stripe`)
      .then(res => {
        setStripePromise(loadStripe(res.data));
      })
      .catch(e => console.log(e));
  }, []);


  // useEffect(() => {
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   }).then(async (result) => {
  //     var { clientSecret } = await result.json();
  //     setClientSecret(clientSecret);
  //   });
  // }, []);

  return (
    <>
      {/* {stripePromise && clientSecret ? (
        // <Elements stripe={stripePromise} options={options}>*/}
      <Elements stripe={stripePromise}>
        <PaymentForm order={order} />
      </Elements>
      {/* ) : (<Loding />)} */}
    </>
  );
}

export default Payment;