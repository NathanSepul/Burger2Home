import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";


import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../../redux/userSlice.js';
import "./Login.css";

const Login = ({ toggleDrawer, isSmall })  =>{

    const isConnected = useSelector(state => state.isConnected.value)
    const dispatch = useDispatch()
  
    const { t } = useTranslation();

    const smallSwitchStatConnected = () =>{
        toggleDrawer(true);
    }

    if(isSmall) {
        if(isConnected){
           return(
                <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                    <Link to="/compte">
                        <AccountCircleIcon fontSize="large" />
                    </Link>
                </IconButton>
           );
        }
        else{
            return(
                <button type="button"  className="monCompte" onClick={() => dispatch(login())}> se connecter </button>
            );
        }
    }



    else{
        if(isConnected){
            return(
                <Link to="/compte" className="monCompte"> {t('navigation.compte')} </Link>

            );
        }
        else{
            return(
                <button type="button"  className="monCompte" onClick={() => dispatch(login())}> se connecter </button>
            );
        }
    }

    
    
}


export default Login