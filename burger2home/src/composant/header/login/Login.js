import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import "./Login.css";

const Login = ({ toggleDrawer, isSmall })  =>{
    const [connected,isConnected] = useState(false);
    const { t } = useTranslation();

    const switchStatConnected = () =>{
        isConnected(!connected);
    };


    const smallSwitchStatConnected = () =>{
        isConnected(!connected);
        toggleDrawer(true);
    }
    if(isSmall) {
        if(connected){
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
                <button type="button"  className="monCompte" onClick={smallSwitchStatConnected}> se connecter </button>
            );
        }
    }



    else{
        if(connected){
            return(
                <Link to="/compte" className="monCompte"> {t('navigation.compte')} </Link>

            );
        }
        else{
            return(
                <button type="button"  className="monCompte" onClick={switchStatConnected}> se connecter </button>
            );
        }
    }

    
    
}


export default Login