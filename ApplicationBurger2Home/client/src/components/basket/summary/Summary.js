import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import "./Summary.css"
import axios from "axios";

const Summary = ({ address, total }) => {
    const user = useSelector(state => state.user)


    // if (address.id === null) {
    //     axios.post(`/addresses`, address)
    //       .then(res => {
    //         setAddress(res.data);
  
    //         let orderT = order;
    //         orderT.addressId = res.data.id
    //         setOrder(orderT)
  
    //         if (order.id === null) {
    //           return axios.get(`/orders/create-order?basketIdentifier=${user.basket.id}&addressIdentifier=${res.data.id}`)
    //         }
    //         else {
    //           return axios.put(`/orders`, order)
    //         }
    //       })
  
    //       .then(res => setOrder(res.data))
    //       .catch(e => console.log(e))
    //   }
    //   else {
    //     axios.put(`/addresses`, address)
    //       .then(res => {
    //         let orderT = order;
    //         orderT.addressId = res.data.id
    //         setOrder(orderT)
  
    //         if (order.id === null) {
    //           return axios.get(`/orders/create-order?basketIdentifier=${user.basket.id}&addressIdentifier=${res.data.id}`)
    //         }
    //         else {
    //           return axios.put(`/orders`, order)
    //         }
    //       })
    //       .then(res => setOrder(res.data))
    //       .catch(e => console.log(e))
    //   }
  

    return (
        <div className="Summary">
            {total}
            <Card className="cardAddress">
                <CardContent className="cardAddressContent">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        nom de l'addresse
                    </Typography>

                    <Typography variant="body2">
                        <span>{user.firstname} {user.lastname}</span>
                        <br />
                        <br />
                        {address.extension !== null ?
                            <>
                                <span>Boite {address.extension}</span>
                                <br />
                            </>
                            :
                            <>
                                <span>Boite {address.extension}</span>
                                <br />
                            </>
                        }

                        <span>{address.number}, {address.street}</span>
                        <br />
                        <span>{address.zipcode}, {address.city}</span>
                        <br />
                        <span>Belgique</span>
                        <br />
                        <br />
                        <span>{address.note}</span>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Summary