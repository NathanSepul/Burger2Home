import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Divider from '@mui/material/Divider';
import AllergensDialog from "./AllergensDialog.js";
import Supplement from "./Supplement.js";
import "./ModalProduct.css";

const ModalProduct = ({ product, hadExtra}) => {

    const [total, setTotal] = useState(product.price);
    const [totalExtra, setTotalExtra] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    let min = 1;
    let max = 50;

    const handleSetQunatity = event => {
        if (event.target.value <= max && event.target.value >= min) {
            setQuantity(event.target.value);
        }
    }

    const onlyNumber = event => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const remove = () => {
        setQuantity(min);
    }

    const subtract = () => {
        (quantity - 1) >= min ? setQuantity(quantity - 1) : setQuantity(quantity)
    }

    const add = () => {
        (quantity + 1) <= max ? setQuantity(quantity + 1) : setQuantity(quantity)

    }

    useEffect(() => {
        let intermediaire = product.price + totalExtra
        setTotal(intermediaire*quantity)
    }, [quantity])

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

            <Modal open={openModal}
                sx={{ zIndex: "1301" }}
                onClose={closeModal}>

                <Box className="modalProduct">
                    <IconButton className="iconClose" onClick={closeModal}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>

                    <div className="titreModal">
                        {product.name}
                        <AllergensDialog product={product}/>
                    </div>
                    <div className="priceModal">{product.price} €</div>

                    <div className="contenuModalProduct">

                        <div className="leftModal">
                            <img className="imageModal" src={product.pictureUrl} alt={product.name} />
                            <p className="descriptionModal">{product.description}</p>
                        </div>


                        <div className="rigthModal">
                            {(hadExtra !== "none") &&(
                                <div className="supplement">
                                    <Supplement/>
                                </div>
                            )}
                            

                            <div className="add">
                                <OutlinedInput
                                    className="addButton"
                                    sx={{ width: "120px", pl: "0px" }}
                                    value={quantity}
                                    onKeyPress={onlyNumber}
                                    onChange={handleSetQunatity}
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ p: "0", ml: "-5px", mr: "-5px" }} >
                                            <IconButton onClick={remove} sx={{ width: "40px" }}>
                                                <DeleteIcon sx={{ color: "black" }} />
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                    endAdornment={
                                        <div className="arrowModal" >
                                            <IconButton onClick={add} className="dropUp" color="none">
                                                <ArrowDropUpIcon sx={{ color: "black" }} fontSize="medium" color="none" />
                                            </IconButton>

                                            <Divider />

                                            <IconButton onClick={subtract} className="dropDown" color="none">
                                                <ArrowDropDownIcon sx={{ color: "black" }} fontSize="medium" />
                                            </IconButton>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>


                    <div className="buttonsModalProduct">
                        <div className="totalDisplay">{total} €</div>
                        <button type="button" onClick={closeModal}>Ajouter au panier</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );

}

export default ModalProduct
