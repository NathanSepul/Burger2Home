import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm.js"



// This is a public sample test API key.
// Sign in to see your own test API key embedded in code samples.
// const stripePromise = loadStripe("pk_test_51MClxJEeRpDc67LOc2Hpo0RtCHSXatmeWj0MiQ52uxOytTB3n94KvhnwRDgZMSnBa9P4rSZ2DTskuA0j2esDrQgj00FGi6WbZD")
function Payment() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
  
    useEffect(() => {
        fetch("/config").then(async (r) => {
          const { publishableKey } = await r.json();
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
        <h1>React Stripe and the Payment Element</h1>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm />
          </Elements>
        )}
      </>
    );
  }

export default Payment;