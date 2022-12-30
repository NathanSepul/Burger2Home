import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import "./Address.css";

const Address = ({ address, setAddress, handleNext, order, setOrder }) => {

  const user = useSelector(state => state.user)
  const [addressList, setAddressList] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const initialState = { id: null, city: "", zipcode: "", street: "", number: "", extension: null, note: "", userId: user.id, active: "true" };

  const { t } = useTranslation();

  useEffect(() => {

    axios.get(`/users/${user.id}/orders`)
      .then(res => {
        let tempOrd = res.data.filter(ord => { return ord.status === "waiting_for_payment" })
        tempOrd.length === 0 ? setOrder({ ...order, userId: user.id }) : setOrder(tempOrd[0]);

        return axios.get(`/users/${user.id}/addresses?mustBeActive=true`)
      })
      .then(res => {
        if (res.data.length !== 0) {
          setAddressList(res.data);
        }
        else {
          setAddress({ ...address, userId: user.id })
        }

        setIsloading(false)
      })

      .catch(e => console.log(e))
  }, [user.id])

  useEffect(() => {

    if (order.addressId != null && addressList.length !== 0) {
      let tempAd = addressList.filter(addr => { return addr.id === order.addressId })
      setAddress(tempAd[0]);
    }

  }, [addressList])

  const changeAddrHandler = (e) => {
    const addr = addressList.filter(add => { return add.id === parseInt(e.target.value) })
    addr.length === 0 ? setAddress(initialState) : setAddress(addr[0])
  }

  const validationForm = () => {

    if (address.id === null) {
      axios.post(`/addresses`, address)
        .then(res => {
          setAddress(res.data);

          let orderT = order;
          orderT.addressId = res.data.id
          setOrder(orderT)

          if (order.id === null) {
            return axios.get(`/orders/create-order?basketIdentifier=${user.basket.id}&addressIdentifier=${res.data.id}`)
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
            return axios.get(`/orders/create-order?basketIdentifier=${user.basket.id}&addressIdentifier=${res.data.id}`)
          }
          else {
            return axios.put(`/orders`, order)
          }
        })
        .then(res => setOrder(res.data))
        .catch(e => console.log(e))
    }

    handleNext()
  }


  if (!isLoading) {
    return (
      <Box
        className="formAddress"
        component='form'
        onSubmit={validationForm}
        sx={{
          '& > :not(style)': { m: "auto", width: "100%" },
        }}
      >

        <Box>
          <select onChange={changeAddrHandler} defaultValue={order.addressId || ''}>
            <option value=''>Choisissez une adresse</option>
            {addressList.map(addr => <option key={addr.id} value={addr.id}>{addr.street}</option>)}
          </select>
        </Box>
        <div className="lineAddresse">
          <Typography variant="h6">
            {user.firstName}
          </Typography>
          <Typography variant="h6">
            {user.lastName}
          </Typography>


        </div>


        <div className="lineAddresse">
          <TextField label="Boite"
            placeholder='ex: 2'
            className="box"
            // error={errorExt.onError}
            // value={address.extension || ''}
            onChange={e => setAddress({ ...address, extension: e.target.value })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />

        </div>

        <div className="lineAddresse">
          <TextField label="Numéro"
            className="number"
            required
            placeholder='ex: 25'
            value={address.number}
            onChange={e => setAddress({ ...address, number: e.target.value })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />


          <TextField label="Rue"
            required
            placeholder='ex: Rue de Lens-St-Remy'
            className="street"
            variant="outlined"
            value={address.street}
            onChange={e => setAddress({ ...address, street: e.target.value })}
            inputProps={{ maxLength: 45 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" >
                  {`${address.street.length}/45`}
                </InputAdornment>
              ),
            }} />

        </div>

        <div className="lineAddresse">

          <TextField label="Code Postal"
            placeholder='ex: 4260'
            className="zip"
            required
            value={address.zipcode}
            onChange={e => setAddress({ ...address, zipcode: e.target.value })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />

          <TextField label="Ville"
            required
            placeholder='ex: Braives'
            className="city"
            variant="outlined"
            value={address.city}
            onChange={e => setAddress({ ...address, city: e.target.value })}
            inputProps={{ maxLength: 45 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" >
                  {`${address.street.length}/45`}
                </InputAdornment>
              ),
            }} />

        </div>

        <div className="lineAddresse">
          <TextField label="Note"
            placeholder='ex: Sonnez à la porte bleu'
            className="note"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            multiline
            value={address.note}
            onChange={e => setAddress({ ...address, note: e.target.value })}
            inputProps={{ maxLength: 255 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" >
                  {`${address.note.length}/255`}
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="buttonAddressForm">
          <Button variant="contained" type="submit">
            {address.id === null ? "continuer" : "continuer"}
          </Button>
        </div>
      </Box>
    );
  }


}

export default Address;