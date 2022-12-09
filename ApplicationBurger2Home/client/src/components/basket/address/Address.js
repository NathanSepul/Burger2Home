import React, {useEffect,useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import AddressForm from './AddressForm';

const Address = () => {

    const [stripePromise, setStripePromise] = useState(null);

    const appearance = {
      theme: 'stripe',
      labels: 'floating'
    }

    let options  = {appearance}
    
    useEffect(() => {
        fetch("/config").then(async (r) => {
          const { publishableKey } = await r.json();
          setStripePromise(loadStripe(publishableKey));
        });
      }, []);
    

      return (
        <Elements stripe={stripePromise} options={options}>
          <AddressForm />
        </Elements>
      );
  }

export default Address;