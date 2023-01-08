import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loading from "../../loading/Loading.js";
import axios from "axios";

import RowBasket from "./RowBasket.js";
import "./TabBasket.css"

const TabBasket = ({ basket, bill, setBill }) => {
    const language = useSelector(state => state.language)
    // eslint-disable-next-line
    const { t } = useTranslation();

    const [listBlUti, setBlUtil] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [reSized, setReSized] = useState({state:false, blId:0})

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/products/summaries?language=${language.value}&availableProductsOnly=true&mustBeOnMenu=true`)
            .then((res) => {
                let tempCopy = [];
                let tempBil = 0;

                //mapping d'une bl et du produit qui lui correspond
                //souche initiale
                for (let j = 0; j < basket.basketLines.length; j++) {
                    
                    let productIndex = res.data.findIndex(a => a.id === basket.basketLines[j].productId)
                    tempCopy.push({ product: res.data[productIndex], basketLine: basket.basketLines[j] })
                    tempBil = tempBil + (basket.basketLines[j].amount * Math.round(res.data[productIndex].actualPrice * 100) / 100)
                }

                setBlUtil(tempCopy);
                setBill(tempBil)
                setIsLoading(false)

            })
            .catch(e => console.log(e))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language.value])

    if(isLoading){
        <Loading/>
    }
    else{
        return (
            <div className="contentBasket">
                <TableContainer component={Paper} className="basketTab">
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row" >Produit</TableCell>
                                <TableCell align="left" sx={{ pl: "70px" }} component="th" scope="row">Quantité</TableCell>
                                <TableCell align="center" component="th" scope="row">Prix</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listBlUti.length !== 0 ? (
                                listBlUti.map((el) => (
                                    <RowBasket key={el.basketLine.id} value={el} setList={setBlUtil} list={listBlUti} setBill={setBill} bill={bill} setReSized={setReSized}/>
                                ))
                            ) : (
                                <TableRow className="emptyBasket">
                                    <TableCell align="center" colSpan="3" >
                                        Votre panier est vide consulter notre&nbsp;
                                        <Link to="/carte">carte</Link>
                                        &nbsp;pour manger beaucoups
                                    </TableCell>
                                </TableRow>
                            )}
    
                        </TableBody>
                    </Table>
                </TableContainer>
    
                <div className="summary">
                    <div className="basketAmount">
                        <div>
                            <p className="txt1BasketAmount">Total</p>
                            <p className="txt2BasketAmount" >(tvac 21%)</p>
                        </div>
    
                        <div>
                            {bill}&nbsp;€
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TabBasket;