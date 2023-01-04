import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip'
import TabBasket from "./tabBasket/TabBasket.js";
import Payement from './payment/Payment.js';
import Summary from './summary/Summary.js'
import Address from "./address/Address.js";
import axios from 'axios';

const steps = ['Résumé', 'Livraison', 'Vérification', 'Payement'];

const StepperOrder = ({ basket }) => {

  const userR = useSelector(state => state.user)
  const initialStateAddress = { id: null, city: "", zipcode: "", street: "", number: "", extension: null, note: "", userId: null, active: "true" };
  const initialStateOrder = { id: null, userId: null, creditCardId: null, addressId: null, orderDate: "", orderLines: [], status: "", paymentIntent: "" }
  
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState(initialStateAddress)
  const [order, setOrder] = useState(initialStateOrder)
  const [bill, setBill] = useState(0);
  const [user,setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`/users/${userR.id}`)
    .then(res => setUser(res.data)
    .catch(e =>console.log(e))
    )
  },[])

  const handleNext = () => {

    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
    else {
      console.log("on est à la fin")

      navigate("/carte");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };






  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );

        })}
      </Stepper>


      <React.Fragment >
        <Box sx={{ display: 'flex', flexDirection: 'row', p: "20px", float: "top" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack}>
              <ArrowBackIosNewRoundedIcon />Revenir
            </Button>
          )}

          <Box sx={{ flex: '1 1 auto' }} />
          {(activeStep === 0) && (
            <Tooltip title="Conncetez vous pour continuer" enterDelay={700} leaveDelay={200} disableHoverListener={userR.isConnected}>
              <span>
                <Button onClick={handleNext} disabled={!userR.isConnected}>
                  Suivant<ArrowForwardIosRoundedIcon />
                </Button>
              </span>
            </Tooltip>

          )}


          {/* {activeStep === 1 && (
            <Button onClick={handleNext} disabled={nextAddrDisable}>
              Suivannnnt<ArrowForwardIosRoundedIcon />
            </Button>
          )} */}

          {/* {activeStep === steps.length - 2 && (
            <Button onClick={handleNext}>
              Confirmer
            </Button>
          )} */}



        </Box>

        <div className="stepper" >
          {activeStep === 0 && (
            <div className="basket">
              <TabBasket basket={basket} bill={bill} setBill={setBill}/>
            </div>
          )}

          {activeStep === steps.length - 3 && (
            <div className="adresse">
              <Address address={address} setAddress={setAddress} handleNext={handleNext} order={order} setOrder={setOrder} user={user} />
            </div>

          )}



          {activeStep === steps.length - 2 && (
            <div className="resume">
              <Summary address={address} setAddress={setAddress} total={bill} handleNext={handleNext} order={order} setOrder={setOrder} user={user} />
            </div>
          )}

          {activeStep === steps.length - 1 && (

            <div className="payment">
              <Payement order={order}/>
            </div>
          )}


        </div>
        {/* zone du bas avec les boutons */}


      </React.Fragment>
    </Box>
  );
}

export default StepperOrder