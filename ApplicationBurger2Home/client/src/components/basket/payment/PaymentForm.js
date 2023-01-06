import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer, CardElement, useStripe, useElements, PaymentElement, injectStripe } from "@stripe/react-stripe-js"
import axios from "axios";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeAll } from '../../../redux/basketSlice.js';
import {loginBasket} from '../../../redux/userSlice.js'
import Loading from "../../loading/Loading.js";
import moment from 'moment';

// import "./PaymentForm.css";


const PaymentForm = ({ order, address, setAddress, setOrder }) => {
  const userR = useSelector(state => state.user)
  const dispatch = useDispatch()
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethodeId, setPaymentMethodeId] = useState(null);

  useEffect(() => {
    if(paymentMethodeId !== null){
      axios.get(`/orders/confirm-order?orderIdentifier=${order.id}&paymentMethodIdentifier=${paymentMethodeId}`)
        .then(res =>{
          //si le payment est confimer on vide le panier et on creer un nouveau (temporaire en fonction du back il devrait gerer ca par la suite)
          let dateTime = new Date();
          dateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
          const basket = {id:null, lastUpdate:dateTime, userId :userR.id, basketLines : []}

          return axios.post(`baskets`,basket)
        })
        .then(res =>{
          console.log(res)
          const basketInformation = { basket:null,size:0}
          basketInformation.basket = res.data;
          dispatch(loginBasket(basketInformation))
        })
        .catch(e => console.log(e))
    }
  }, [paymentMethodeId])

  const handleSubmit = async (event) => {
    event.preventDefault();

    //liaison de l'address avec la commande
    if (address.id === null) {
      axios.post(`/addresses`, address)
        .then(res => {
          setAddress(res.data);

          let orderT = order;

          orderT.addressId = res.data.id

          let dateTime = new Date();
          dateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
          orderT.orderDate = dateTime

          setOrder(orderT)

          //si nouvelle commande on creer sur base basket id et address id ce qui est fait au dessus ne sers que dans le cas d'un update
          if (order.id === null) {
            return axios.get(`/orders/create-order?basketIdentifier=${userR.basket.id}&addressIdentifier=${res.data.id}`)
          }
          else {
            return axios.put(`/orders`, order)
          }
        })

        .then(res => setOrder(res.data))
        .then(()=> createPM() )
        .catch(e => console.log(e))
    }
    else {
      let orderT = order;

      orderT.addressId = address.id

      let dateTime = new Date();
      dateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      orderT.orderDate = dateTime

      setOrder(orderT)

      //si nouvelle commande on creer sur base basket id et address id ce qui est fait au dessus ne sers que dans le cas d'un update
      if (order.id === null) {
        axios.get(`/orders/create-order?basketIdentifier=${userR.basket.id}&addressIdentifier=${address.id}`)
          .then(res => setOrder(res.data))
          .then(()=> createPM() )
          .catch(e => console.log(e))
      }
      else {
        axios.put(`/orders`, order)
          .then(res => setOrder(res.data))
          .then(()=> createPM() )
          .catch(e => console.log(e))
      }

    }

   

  }

const createPM = async () =>{
  console.log("hhhhh")
  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: elements.getElement(CardElement),
  });


  if (error) {
    console.log(error)
  }
  else {
    console.log(paymentMethod)
    setPaymentMethodeId(paymentMethod.id)
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
            }} />
        </label>
        <div id="card-element"></div>
        <div id="card-errors" role="alert"></div>
      </div>

      <div className="buttonSumForm">
        <Button variant="contained" onClick={handleSubmit}>
          Payer
        </Button>
      </div>
    </form>
  );
}

export default PaymentForm;
