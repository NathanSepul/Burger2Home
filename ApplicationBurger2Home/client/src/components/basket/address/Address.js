import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import "./Address.css";

const Address = ({ address, setAddress, handleNext, order, setOrder, user }) => {

  const userR = useSelector(state => state.user)
  const [addressList, setAddressList] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const initialState = { id: null, city: "", zipcode: "", street: "", number: "", extension: null, note: "", userId: userR.id, active: "true" };

  const { t } = useTranslation();

  useEffect(() => {

    axios.get(`/users/${userR.id}/orders`)
      .then(res => {
        let tempOrd = res.data.filter(ord => { return ord.status === "waiting_for_payment" })
        tempOrd.length === 0 ? setOrder({ ...order, userId: userR.id }) : setOrder(tempOrd[0]);

        return axios.get(`/users/${userR.id}/addresses?mustBeActive=true`)
      })
      .then(res => {
        if (res.data.length !== 0) {
          setAddressList(res.data);
        }
        else {
          setAddress({ ...address, userId: userR.id })
        }
        setIsloading(false)
      })
      .catch(e => console.log(e))
  }, [userR.id])

  useEffect(() => {

    if(!addrCompleted()){
      if (order.addressId != null && addressList.length !== 0 && addrCompleted) {
      let tempAd = addressList.filter(addr => { return addr.id === order.addressId })
      setAddress(tempAd[0]);
    }
    }
    
  }, [addressList])

  const addrCompleted = () =>{

    if(address.zipcode === ""){
      return false}
    
    if(address.street === ""){
      return false
    }

    if(address.city === ""){
      return false}
    
    if(address.number === ""){
      return false}

    return true
  }

  const changeAddrHandler = (e) => {
    const addr = addressList.filter(add => { return add.id === parseInt(e.target.value) })
    addr.length === 0 ? setAddress(initialState) : setAddress(addr[0])
  }

  const readOnlyAddress = () =>{
    return address.id !== null 
  }

  if (!isLoading) {
    return (
      <Box
        className="formAddress"
        component='form'
        onSubmit={handleNext}
        sx={{
          '& > :not(style)': { m: "auto", width: "100%" },
        }}
      >

        <Box>
          <select onChange={changeAddrHandler} defaultValue={address.id || ''}>
            <option value=''>Nouvelle adresse </option>
            {addressList.map(addr => <option key={addr.id} value={addr.id}>{addr.street}</option>)}
          </select>
        </Box>
        <div className="lineAddresse">
          <Typography variant="h6">
            {user.firstname}
          </Typography>
          <Typography variant="h6">
            {user.lastname}
          </Typography>


        </div>

        <div className="lineAddresse">
          <TextField label="Boite"
            disabled={ readOnlyAddress() && address.extension === null }
            placeholder='ex: 2'
            className="box"
            // error={errorExt.onError}
            value={address.extension || ''}
            onChange={e => setAddress({ ...address, extension: e.target.value })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            InputProps={{ readOnly: readOnlyAddress() }}
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
            InputProps={{ readOnly: readOnlyAddress() }}
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
              readOnly: readOnlyAddress(),
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
            InputProps={{ readOnly: readOnlyAddress() }}
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
              readOnly: readOnlyAddress(),
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
            InputLabelProps={{ shrink: true,}}
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
            continuer
          </Button>
        </div>
      </Box>
    ); 
  }


}

export default Address;