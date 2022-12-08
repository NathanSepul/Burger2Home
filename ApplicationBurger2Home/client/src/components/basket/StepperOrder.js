import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import TabBasket from "./tabBasket/TabBasket.js";
import Payement from './payment/Payment.js';

const steps = ['Résumé', 'Votre adresse', 'Vérification', 'Payement'];

const StepperOrder = ({ basket }) => {

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

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

          {activeStep === steps.length - 1 ? (
            <Button onClick={handleNext}>
              Confirmer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Suivant<ArrowForwardIosRoundedIcon />
            </Button>
          )}

        </Box>

        <div className="stepper" >
          {activeStep === 0 && (
            <div className="basket">
              <TabBasket basket={basket} />
            </div>
          )}

          {activeStep === steps.length - 3 && (
            <div className="adresse">
              on vérifie une adresse
            </div>
          )}

          {activeStep === steps.length - 2 && (
            <div className="resume">
              on verifie le résumé
              
            </div>
          )}

          {activeStep === steps.length - 1 && (
            <div className="payment">
              <Payement/>
            </div>
          )}
        </div>
        {/* zone du bas avec les boutons */}


      </React.Fragment>
    </Box>
  );
}

export default StepperOrder