import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe} from "@stripe/react-stripe-js";

const PaymentForm = () => {
    const stripe = useStripe();

    return (
        <form>
            <PaymentElement />
            <button disabled={!stripe}>Submit</button>
        </form>
    )
};
export default PaymentForm