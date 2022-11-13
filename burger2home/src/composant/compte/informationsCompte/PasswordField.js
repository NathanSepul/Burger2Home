import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import "./PasswordField.css"

const PasswordField = ({ disable, pwd, setPwd, labelInput }) => {

    const [type, setType] = useState("password");


    const handleSetType = () => {
        type === "text" ? setType("password") : setType("text")
    }

    return (
        <div className="passwordDiv">
            <TextField disabled={disable} className="inputPassword" type={type} label={labelInput} variant="outlined" value={pwd} onChange={e => { setPwd(e.target.value) }} />

            {(type === "password") && (
                <Tooltip title="Afficher" placement="bottom" arrow >
                    <Button disabled={disable} onClick={handleSetType}>
                        <VisibilityIcon />
                    </Button>
                </Tooltip>
            )}

            {(type === "text") && (
                <Tooltip title="Masquer" placement="bottom" arrow >
                    <Button disabled={disable} onClick={handleSetType}>
                        <VisibilityOff />
                    </Button>
                </Tooltip>
            )}

        </div>);

}

export default PasswordField