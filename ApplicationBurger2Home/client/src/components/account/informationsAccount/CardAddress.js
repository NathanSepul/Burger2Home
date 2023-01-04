import React from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
const CardAddress = ({ address, user, setReload }) => {

    const disableAddress = () => {
        let temp =address;
        temp.active = false
        
        axios.put(`/addresses`,temp)
        .then(res => setReload(true))
        .catch(e => console.log(e))
    }
    return (
        <Card className="cardAddress">
            <CardContent  className="cardAddressContent">
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
            <CardActions>
                <Button size="small" onClick={disableAddress}>Supprimer</Button>
            </CardActions>
        </Card>
    );
}

export default CardAddress