import React, { useEffect, useState } from "react"
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import { textTransform } from "@mui/system";

const Filtre = ({ ValueList, SetValueList}) => {


    const handleChangeCheck = (e, value) => {
        let i = ValueList.values.findIndex(obj => obj.id === value.id);
        ValueList.values[i].checked = e.target.checked
        SetValueList({ values: ValueList.values })
    }

    return (

        <FormGroup className="filtreCheckBox">

            {ValueList.values.map((value) => {
                return <FormControlLabel key={value.id} label={value.name} labelPlacement="end"
                    control={<Checkbox key={value.id} checked={value.checked} onChange={e => handleChangeCheck(e, value)} />} />
            })}
        </FormGroup>

    );



}
export default Filtre