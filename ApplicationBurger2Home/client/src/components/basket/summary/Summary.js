import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import axios from "axios";
import Payement from "../payment/Payment.js"
import "./Summary.css"

const Summary = ({ address, setAddress, total, handleNext, order, setOrder, user }) => {

    const confimation = () => {
        handleNext();
    }

    return (
        <div className="Summary">

            <div className="SummaryContent">
                <Card className="cardAddressBasket">
                    <CardContent className="cardAddressBasketContent" >
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {address.label}
                        </Typography>

                        <Typography variant="body2">
                            <span>{user.firstname} {user.lastname}</span>
                            <br />
                            <br />
                            {address.extension !== null && (
                                <>
                                    <span>Boite {address.extension}</span>
                                    <br />
                                </>
                            )}

                            <span>{address.number}, {address.street}</span>
                            <br />
                            <span>{address.zipcode}, {address.city}</span>
                            <br />
                            <span>Belgique</span>
                            <br />
                            <br />
                            {address.note.length !== 0 && (
                                <>
                                    <span>Note</span>
                                    <div className="noteOrder">{address.note}</div>
                                </>
                            )}

                        </Typography>
                    </CardContent>
                </Card>

                <div className="AmountOrder">
                    {total}
                    <div>info de payement</div>
                    <Payement order={order} address={address} setAddress={setAddress} setOrder={setOrder}/>
                </div>
            </div>
        </div>
    );
}

export default Summary