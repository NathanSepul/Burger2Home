import React from "react"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Payement from "../payment/Payment.js"
import Divider from '@mui/material/Divider';

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
                            {address.extension !== null && address.extension !== "" && (
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
                                <div>
                                    <span>Note</span>
                                    <br />
                                    <div className="noteOrder">{address.note}</div>
                                </div>
                            )}

                        </Typography>
                    </CardContent>
                </Card>
                <div className="paymentResum">

                    <div className="addition">
                        <div className="additionPayment">
                            <div>
                                <p className="txt1Pay">Total</p>
                                <p className="txt2Pay" >(htva 21%)</p>
                            </div>

                            <div className="amountBill">
                                {total * 0.79}&nbsp;€
                            </div>
                        </div>

                        <div className="additionPayment">
                            <div>
                                <p className="txt1Pay">T.V.A</p>
                            </div>

                            <div className="amountBill">
                                {total * 0.21}&nbsp;€
                            </div>
                        </div>

                        <div className="additionPayment">
                            <div>
                                <p className="txt1Pay">Livraison</p>
                            </div>

                            <div className="amountBill">
                                offerte
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <Payement order={order} address={address} setAddress={setAddress} setOrder={setOrder} />
                </div>
            </div>
        </div>
    );
}

export default Summary