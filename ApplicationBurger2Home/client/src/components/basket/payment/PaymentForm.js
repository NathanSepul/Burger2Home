

import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import Button from '@mui/material/Button';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import { loginBasket } from '../../../redux/userSlice.js'

import axios from "axios";

const PaymentForm = ({ order, address, setAddress, setOrder }) => {
  const [paymentMethodeId, setPaymentMethodeId] = useState(null);
  const [isProcessing, setProcessingTo] = useState(false);
  const userR = useSelector(state => state.user)
  const stripe = useStripe();
  const elements = useElements();
  const openSnack = { msg: "", severity: "" }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const options = ({
    style: {
      base: {
        color: "#000",
        letterSpacing: "0.03rem",
        "::placeholder": {
          color: "#424770"
        }
      },
      invalid: {
        color: "#d00606"
      },

    }
  })

  useEffect(() => {
    if (paymentMethodeId !== null) {
      axios.get(`/orders/confirm-order?orderIdentifier=${order.id}&paymentMethodIdentifier=${paymentMethodeId}`)
        .then(res => {
          //si le payment est confimer on vide le panier et on creer un nouveau (temporaire en fonction du back il devrait gerer ca par la suite)
          let dateTime = new Date();
          dateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
          const basket = { id: null, lastUpdate: dateTime, userId: userR.id, basketLines: [] }

          return axios.post(`baskets`, basket)
        })
        .then(res => {
          console.log(res)
          const basketInformation = { basket: null, size: 0 }
          basketInformation.basket = res.data;
          dispatch(loginBasket(basketInformation))

          openSnack.msg = "Le payment est accepeté"
          openSnack.severity = "success"

          dispatch(open(openSnack))
          setProcessingTo(false);
          navigate(`/`)
        })
        .catch(e =>{
          console.log(e)
          setProcessingTo(false)
        })
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodeId])

  const handleSubmit = async (e) => {
    setProcessingTo(true)
    e.preventDefault();
    //liaison de l'address avec la commande
    // creation addres si inexistante
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
        .then(() => createPM())
        .catch(e => {
          setProcessingTo(false);
          console.log(e)
        })
    }
    else {
      //l'address peut avoir été modifié sur la note a livreur
      axios.put(`/addresses`, address)
        .then(res => {
          let orderT = order;

          orderT.addressId = res.data.id

          let dateTime = new Date();
          dateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

          orderT.orderDate = dateTime

          setOrder(orderT)

          if (order.id === null) {
            return axios.get(`/orders/create-order?basketIdentifier=${userR.basket.id}&addressIdentifier=${res.data.id}`)
          }
          else {
            return axios.put(`/orders`, order)
          }
        })
        .then(res => setOrder(res.data))
        .then(() => createPM())
        .catch(e => {
          setProcessingTo(false);
          console.log(e)
        })
    }

  }

  const createPM = async () => {

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setProcessingTo(false)
      openSnack.msg = error.message
      openSnack.severity = "error"
      dispatch(open(openSnack))
    }
    else {
      console.log(paymentMethod)
      setPaymentMethodeId(paymentMethod.id)
    }
  }
  return (
    <form onSubmit={handleSubmit} >
      <label>Informations bancaire</label>
      <br/>
      <br/>
      <div className="fieldPay">
        <span>Card number</span>
        <CardNumberElement options={options} className="inputPay"/>
      </div>
      <div className="fieldPay">
        <span>Expiration date</span>
        <CardExpiryElement options={options} className="inputPay"/>
      </div>

      <div className="fieldPay">
        <span>CVC</span>
        <CardCvcElement options={options} className="inputPay"/>
      </div>

      <div className="buttonSumForm">
        <Button variant="contained" type="submit" disabled={isProcessing || !stripe}>
          {isProcessing ? "Tentatives de payement" : "Payer"}
        </Button>
      </div>
    </form>
  );

}

export default PaymentForm;
