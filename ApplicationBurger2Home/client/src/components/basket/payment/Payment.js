import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm.js"
import Loading from "../../loading/Loading.js"
import axios from "axios";


const Payment = ({ order, address, setOrder, setAddress}) => {

  const [stripePromise, setStripePromise] = useState(null);
  // const [clientSecret, setClientSecret] = useState(null);

  const appearance = {
    theme: 'stripe',
    labels: 'floating',
  }

  let options = {  appearance}

  useEffect(() => {
    axios.get(`/keys/stripe`)
      .then(res => {
        setStripePromise(loadStripe(res.data));
      })
      .catch(e => console.log(e));
  }, []);


  return (
    <>
       {stripePromise ? (
       <Elements stripe={stripePromise} options={options}>
        <PaymentForm order={order} address={address} setAddress={setAddress} setOrder={setOrder}/>
      </Elements>
       ) : (<Loading />)} 
    </>
  );
}

export default Payment;