import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer, CardElement, useStripe, useElements, PaymentElement, injectStripe} from "@stripe/react-stripe-js"
import Loading from "../../../loading/Loading.js"
import axios from "axios";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { removeAll } from '../../../../redux/basketSlice.js';
import "./PaymentForm.css";


const PaymentForm = ({ order }) => {  
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     let payload = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement)
//     })

//     console.log(payload)
//   //   .then(({paymentMethod}) => {
//   //     console.log('Received Stripe PaymentMethod:', paymentMethod);
//   //   });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit">Pay</button>
//     </form>
//   );

// }









// -------------------------------------------------
//  version sans client secret =>
// -------------------------------------------------


  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) =>{
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
  
    if (error) {
      console.log('Error creating payment method:', error);
    } else {
      axios.get(`/orders/confirm-order?orderIdentifier=${order.id}&paymentMethodIdentifier=${paymentMethod.id}`)
      .then(res => console.log(res))
      .catch(e => console.log(e))
    }
  }




  return (
    <form id="payment-form">
      <div className="form-row">
        <label>
          Card details
          <CardElement 
            style={{
              base: {
                fontSize: '50px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            }}/>
        </label>
        <div id="card-element"></div>
        <div id="card-errors" role="alert"></div>
      </div>

      <button onClick={handleSubmit}>Submit Payment</button>
    </form>
  );
}

export default  PaymentForm;
