import React from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import { useSelector} from 'react-redux';
import "./Login.css";

const Login = ({ toggleDrawer, isSmall }) => {

    const user = useSelector(state => state.user)

    const { t } = useTranslation();



    if (user.isConnected) {
        if (isSmall) {
            return (
                <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                    <Link to="/compte">
                        <AccountCircleIcon fontSize="large" />
                    </Link>
                </IconButton>
            );
        }
        else {
            return (
                <Link to="/compte" className="monCompte"> {t('navigation.compte')} </Link>
            );
        }
    }

    else {

        return (
            <Link to="/connection" className="connection">{t('connexion.connexion')}</Link>
        );

    }




}


export default Login