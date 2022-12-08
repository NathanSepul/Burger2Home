import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm.js"


// This is a public sample test API key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51MClxJEeRpDc67LOc2Hpo0RtCHSXatmeWj0MiQ52uxOytTB3n94KvhnwRDgZMSnBa9P4rSZ2DTskuA0j2esDrQgj00FGi6WbZD")

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // lien vers le endpoint du back qui retourne le clé secrete du client
        fetch("/secret")
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

    return (
        <div className="stripeElement">
                <Elements optiton={options} stripe={stripePromise}>
                    <PaymentForm />
                </Elements>
        </div>
    );

}

export default Payment;