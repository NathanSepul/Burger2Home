import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm.js"
import Loding from "../../loding/Loding.js"
import axios from "axios";


const Payment = () => {

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const appearance = {
      theme: 'stripe',
      labels: 'floating'
    }

    let options  = {clientSecret,appearance}
    
    useEffect(() => {
        axios.get("/keys/stripe")
        .then( r => {
          const { publishableKey } =  r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }, []);
    
      useEffect(() => {
        fetch("/create-payment-intent", {
          method: "POST",
          body: JSON.stringify({}),
        }).then(async (result) => {
          var { clientSecret } = await result.json();
          setClientSecret(clientSecret);
        });
      }, []);

    return (
      <>
        {clientSecret && stripePromise ? (
          <Elements stripe={stripePromise} options={options} >
            <PaymentForm />
          </Elements>
        ):(<Loding />)}
      </>
    );
  }

export default Payment;