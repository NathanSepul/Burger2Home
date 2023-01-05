import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer, CardElement, useStripe, useElements, PaymentElement, injectStripe} from "@stripe/react-stripe-js"
import Loading from "../../loading/Loading.js"
import axios from "axios";
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { removeAll } from '../../../redux/basketSlice.js';
import "./PaymentForm.css";


const PaymentForm = ({ order }) => {  
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    let payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    console.log(payload)
  //   .then(({paymentMethod}) => {
  //     console.log('Received Stripe PaymentMethod:', paymentMethod);
  //   });
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );

}

export default  PaymentForm;









//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useDispatch();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleSubmit = async (e) => {

//     // e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsProcessing(true);

  
//     const {error} = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/`,
//       },
//     });
  
//     if (error.code === "invalid_owner_name"){
//       setMessage("Veillez à entrer le Prénom et le Nom");
//     }

//     console.log(error)
//     // if (result.error) {
//     //   console.log(result.error)
//     // }
//     // else {
//     //   console.log("it work")
//     //   dispatch(removeAll)
//     // }

//     setIsProcessing(false);

//   };

//   return (
//      <form className="paymentForm" action="/create-checkout-session" method="POST">
//       <PaymentElement id="payment-element" />
//        <Button onClick={handleSubmit} >
//          Payer
//        </Button>
//      </form>

//     <div className="paymentForm">
//       <PaymentElement />
//       <br/>
//       <Button onClick={handleSubmit} className="paymentButton" disabled={isProcessing}>
//         {isProcessing ? "Action en cours ... " : "Payer"}
//       </Button>

//       {message && <div className="payment-message">{message}</div>}
//     </div>
//   );



// -------------------------------------------------
//  version sans client secret =>
// -------------------------------------------------


//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event) =>{
//     event.preventDefault();

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: elements.getElement(CardElement),
//     });
  
//     if (error) {
//       console.log('Error creating payment method:', error);
//     } else {
//       // send the payment method to your server to create a charge
//       console.log('Successful payment method:', paymentMethod);
//       axios.get(`/orders/confirm-order?orderIdentifier=${order.id}&paymentMethodIdentifier=${paymentMethod.id}`)
//       .then(res => console.log(res))
//       .catch(e => console.log(e))
//     }
//   }




//   return (
//     <form id="payment-form">
//       <div className="form-row">
//         <label>
//           Card details
//           <CardElement 
//             style={{
//               base: {
//                 fontSize: '50px',
//                 color: '#424770',
//                 '::placeholder': {
//                   color: '#aab7c4',
//                 },
//               },
//               invalid: {
//                 color: '#9e2146',
//               },
//             }}/>
//         </label>
//         <div id="card-element"></div>
//         <div id="card-errors" role="alert"></div>
//       </div>

//       <button onClick={handleSubmit}>Submit Payment</button>
//     </form>
//   );
// }
