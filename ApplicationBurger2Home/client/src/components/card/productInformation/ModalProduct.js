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

import { useDispatch } from 'react-redux';
import { addToBasketRedux } from '../../../redux/basketSlice.js';
import { Buffer } from "buffer";
import axios from 'axios';

import AllergensDialog from "./AllergensDialog.js";
import "./ModalProduct.css";

const ModalProduct = ({ product }) => {
    const [total, setTotal] = useState(Math.round(product.actualPrice * 100) / 100);
    const [openModal, setOpenModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [buttonDisable, setDisable] = useState(false);
    const [localImg, setLocalImg] = useState(null);

    useEffect(() => {
        axios.get(`/products/${product.id}/image`, { responseType: 'arraybuffer' })
            .then(res => {
                const imageBuffer = Buffer.from(res.data, 'binary');
                const imageString = 'data:image/jpeg;base64,' + imageBuffer.toString('base64');
                setLocalImg(imageString)
            })
            .catch(e => {
                console.error(e);
            })
    }, [])

    const dispatch = useDispatch();

    let min = 1;
    let max = 50;

    const handleSetTotal = (amount) => {
        setTotal(Math.round(amount * 100) / 100);
    }
    const handleSetQunatity = event => {
        if (parseInt(event.target.value) <= max && parseInt(event.target.value) >= min) {
            setQuantity(event.target.value);
        }
        else {
            setQuantity(0);
        }
    }

    const onlyNumber = event => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }
    }

    const closeModal = () => {
        setQuantity(1);
        setOpenModal(false);
    }

    const addToBasket = () => {

        const basketLine = {
            productId: product.id,
            quantity: quantity,
        };
        dispatch(addToBasketRedux(basketLine));
        setOpenModal(false);

    }
    const remove = () => {
        setQuantity(min);
    }

    const subtract = () => {
        (parseInt(quantity) - 1) >= min ? setQuantity(parseInt(quantity) - 1) : setQuantity(0)
    }

    const add = () => {
        (parseInt(quantity) + 1) <= max ? setQuantity(parseInt(quantity) + 1) : setQuantity(quantity)
    }

    useEffect(() => {
        handleSetTotal(Math.round(product.actualPrice * 100) / 100 * parseInt(quantity))

        quantity === 0 ? setDisable(true) : setDisable(false)

    }, [quantity, product.actualPrice])

    return (
        <div>
            <CardMedia
                className="CardMedia"
                onClick={() => setOpenModal(true)}
                component="img"
                height="250"
                src={localImg}
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
                        <AllergensDialog product={product} />
                    </div>

                    {product.currentDiscount === null ?
                        <div className="priceModal">{Math.round(product.currentPrice * 100) / 100}€</div>
                        :
                        <div className="priceModal">
                            <span className="priceModalPromo">{Math.round(product.currentPrice * 100) / 100}€</span>
                            <span className="priceDiscount">{Math.round(product.actualPrice * 100) / 100}€</span>
                        </div>
                    }


                    <div className="contentModal">
                        <img className="imageModal" src={localImg} alt={product.name} />
                        <p className="descriptionModal">{product.description}</p>

                        <div className="add">
                            <OutlinedInput
                                className="addButton"
                                sx={{ width: "120px", pl: "0px" }}
                                disabled={!product.available}
                                value={quantity}
                                onKeyPress={onlyNumber}
                                onChange={handleSetQunatity}
                                startAdornment={
                                    <InputAdornment position="start" sx={{ p: "0", ml: "-5px", mr: "-5px" }}  >
                                        <IconButton onClick={remove} sx={{ width: "40px" }} disabled={!product.available}>
                                            <DeleteIcon sx={{ color: "black" }} />
                                        </IconButton>
                                    </InputAdornment>
                                }

                                endAdornment={
                                    <div className="arrowModal" >
                                        <IconButton onClick={add} className="dropUp" color="none" disabled={!product.available}>
                                            <ArrowDropUpIcon sx={{ color: "black" }} fontSize="medium" color="none" />
                                        </IconButton>

                                        <Divider />

                                        <IconButton onClick={subtract} className="dropDown" color="none" disabled={!product.available}>
                                            <ArrowDropDownIcon sx={{ color: "black" }} fontSize="medium" />
                                        </IconButton>
                                    </div>
                                }
                            />
                        </div>

                        <div className="buttonsModalProduct">
                            <div className="totalDisplay">{total} €</div>
                            <button type="button" disabled={buttonDisable || !product.available} onClick={addToBasket}>Ajouter au panier</button>
                        </div>
                    </div>

                </Box>
            </Modal>
        </div>
    );

}

export default ModalProduct
