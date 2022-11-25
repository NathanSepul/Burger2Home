import React, { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button";
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


import "./ModalProduct.css";

const ModalProduct = ({ product }) => {

    const [openModal, setOpenModal] = useState(false);

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <div>
            <CardMedia
                className="CardMedia"
                onClick={() => setOpenModal(true)}
                component="img"
                height="250"
                src={product.pictureUrl}
                alt={product.name}
            />

            <Modal  open={openModal} 
                    sx={{ zIndex: "1000001" }}
                    onClose={closeModal}>

                <Box className="modalProduct">
                    <IconButton className="iconClose" onClick={closeModal}>
                        <CloseRoundedIcon fontSize="small"/>
                    </IconButton>
                   
                    <div className="titreModal">{product.name}</div>
                    <div className="priceModal">{product.price} €</div>
                   
                    <div className="contenuModalProduct">
                        <img className="imageModal" src={product.pictureUrl} alt={product.name} />
                        <div>
                            <div className="allergenes">
                            <div> Allergène :</div>
                                <ul>
                                    {product.allergenes.map(allergene => (
                                            <li key={allergene.id}> {allergene.name} </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="descriptionModal">{product.description}</div>

                    <div className="buttonsModalProduct">
                        <Button variant="outlined" onClick={closeModal}> quitter </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalProduct
