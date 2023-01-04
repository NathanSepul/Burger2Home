import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import "./Summary.css"
import axios from "axios";

const Summary = ({ address, setAddress,total, handleNext, order, setOrder, user }) => {
    const userR = useSelector(state=> state.user)

    const confimation = () =>{
        if (address.id === null) {
            axios.post(`/addresses`, address)
                .then(res => {
                    setAddress(res.data);

                    let orderT = order;
                    orderT.addressId = res.data.id
                    setOrder(orderT)

                    if (order.id === null) {
                        return axios.get(`/orders/create-order?basketIdentifier=${userR.basket.id}&addressIdentifier=${res.data.id}`)
                    }
                    else {
                        return axios.put(`/orders`, order)
                    }
                })

                .then(res => setOrder(res.data))
                .catch(e => console.log(e))
        }
        else {
            axios.put(`/addresses`, address)
                .then(res => {
                    let orderT = order;
                    orderT.addressId = res.data.id
                    setOrder(orderT)

                    if (order.id === null) {
                        return axios.get(`/orders/create-order?basketIdentifier=${userR.basket.id}&addressIdentifier=${res.data.id}`)
                    }
                    else {
                        return axios.put(`/orders`, order)
                    }
                })
                .then(res => setOrder(res.data))
                .catch(e => console.log(e))
        }

        handleNext();
    }

    return (
        <div className="Summary">
          
            <div className="SummaryContent">
                <Card className="cardAddressBasket">
                    <CardContent className="cardAddressContent">
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            nom de l'addresse
                        </Typography>

                        <Typography variant="body2">
                            <span>{user.firstname} {user.lastname}</span>
                            <br />
                            <br />
                            {address.extension !== null &&(
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
                            {address.note.length !== 0 &&(
                                <>
                                    <div className="noteOrder">{address.note}</div>
                                    <br />
                                </>
                            )}
                        
                        </Typography>
                    </CardContent>
                </Card>

                <div className="AmountOrder">
                    {total}
                </div>
            </div>
            

            <div className="buttonSumForm">
                <Button variant="contained" onClick={confimation}>
                    confirmer
                </Button>
            </div>
        </div>
    );
}

export default Summary