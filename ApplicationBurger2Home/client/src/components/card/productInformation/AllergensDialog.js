import React, { useState, useEffect } from "react"
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import axios from 'axios';

import { useTranslation } from "react-i18next";

import "./AllergensDialog.css";

const AllergensDialog = ({ product }) => {
    const { t } = useTranslation();
    const [openDialog, setOpenDialog] = useState(false);
    const [allergens, setAllergen] = useState(product.allergens);


    return (
        <span className="allergenesIcon">
            <IconButton onClick={() => setOpenDialog(true)}>
                <InfoIcon sx={{ color: "black" }} fontSize="small" />
            </IconButton>

            <Dialog
                open={openDialog}
                sx={{ zIndex: "1302" }}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('produits.allergenes')}
                </DialogTitle>
                <DialogContent>
                    <ul>
                        {allergens.map(element => {
                            return <li key={element}> {element} </li>
                        })}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>ok</Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}

export default AllergensDialog;