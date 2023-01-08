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

const Address = ({ address, setAddress, handleNext, order, setOrder, user, basket }) => {

  const userR = useSelector(state => state.user)
  const [addressList, setAddressList] = useState([])
  const [isLoading, setIsloading] = useState(true)

  const initialState = { id: null, city: "", zipcode: "", street: "", number: "", extension: null, note: "", userId: userR.id, active: "true", label: "" };

// eslint-disable-next-line
  const { t } = useTranslation();

  useEffect(() => {

    // récuperation des commandes de l'utilisateur avec un status waiting_for_payment
    // cas 1 => il n'y en a pas => nouvelle commande (just id user)
    // cas 2 => il y en a une ou plusieurrd => on prend la plus récente et on compare les bl avec les order line pour voir si il y a eu des modification si oui => nouvelle commande

    axios.get(`/users/${userR.id}/orders`)
      .then(res => {
        let tempOrd = res.data.filter(ord => { return ord.status === "waiting_for_payment" })
        tempOrd = tempOrd.sort((a, b) => a.id < b.id ? 1 : -1) //du plus vieux (petit id ) au plus jeune

        //1) il n'y a pas encore de commande pour ce panier
        //2) la commande la plus récente n'a pas le même nombre de ligne
        if (tempOrd.length === 0 || tempOrd[0].orderLines.length !== basket.basketLines.length) {
          setOrder({ ...order, userId: userR.id })
        }
        else {
          let tempBls = basket.basketLines;
          let tempOls = tempOrd[0].orderLines;

          tempBls = tempBls.sort((a, b) => (a.productId < b.productId ? 1 : -1))
          tempOls = tempOls.sort((a, b) => (a.productId < b.productId ? 1 : -1))

          let isSame = true;

          for (let i = 0; i < tempBls.length; i++) {
            if (tempBls[i].productId !== tempOls[i].productId || tempBls[i].amount !== tempOls[i].amount) {
              isSame = false
              break;
            }
          }

          isSame ? setOrder(tempOrd[0]) : setOrder({ ...order, userId: userR.id })

        }

        // récuperation des addresse actives
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

// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userR.id])




  
  useEffect(() => {

    if (!addrCompleted()) {
      if (order.addressId != null && addressList.length !== 0) {
        let tempAd = addressList.filter(addr => { return addr.id === order.addressId })
        setAddress(tempAd[0]);
      }
    }
    
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressList])

  const addrCompleted = () => {

    if (address.label === "") {
      return false
    }

    if (address.zipcode === "") {
      return false
    }

    if (address.street === "") {
      return false
    }

    if (address.city === "") {
      return false
    }

    if (address.number === "") {
      return false
    }

    return true
  }

  const changeAddrHandler = (e) => {
    const addr = addressList.filter(add => { return add.id === parseInt(e.target.value) })
    addr.length === 0 ? setAddress(initialState) : setAddress(addr[0])
  }

  const readOnlyAddress = () => {
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
            {addressList.map(addr => <option key={addr.id} value={addr.id}>{addr.label}</option>)}
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
          <TextField label="Label"
            required
            placeholder='ex: Maison'
            className="label"
            variant="outlined"
            value={address.label}
            onChange={e => setAddress({ ...address, label: e.target.value })}
            inputProps={{ maxLength: 100}}
            InputProps={{
              readOnly: readOnlyAddress(),
              endAdornment: (
                <InputAdornment position="end" >
                  {`${address.street.length}/100`}
                </InputAdornment>
              ),
            }} />
        </div>

        <div className="lineAddresse">
          <TextField label="Boite"
            disabled={readOnlyAddress() && address.extension === null}
            placeholder='ex: 2'
            className="box"
            value={address.extension || ''}
            onChange={e => setAddress({ ...address, extension: e.target.value })}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' , maxLength: 4}}
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4}}
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
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4}}
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
                  {`${address.city.length}/45`}
                </InputAdornment>
              ),
            }} />

        </div>

        <div className="lineAddresse">
          <TextField label="Note"
            placeholder='ex: Sonnez à la porte bleu'
            className="note"
            variant="outlined"
            InputLabelProps={{ shrink: true, }}
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