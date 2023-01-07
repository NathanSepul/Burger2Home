import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { isFulfilled } from "@reduxjs/toolkit";

const TrisProduct = ({tris, setFiltre}) => {

    const changeOrder = (e) => {
        console.log("on chnaga")
        setFiltre(e.target.value)
    }
    return (
        // <>{!isLoading && (

            <select name="trisProduct" onChange={changeOrder} defaultValue="Alphabétique" className="trisProducts">
                {tris.map((e) => {
                    return <option key={e.id} value={e.id}>{e.name}</option>
                })}
            </select>
        // )}</>
    );
}

export default TrisProduct