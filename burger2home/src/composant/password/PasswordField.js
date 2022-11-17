import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";

import "./PasswordField.css"

const PasswordField = ({ disable, pwd, setPwd, labelInput }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="passwordDiv">
            <FormControl variant="outlined" className="inputPassword" >
                <InputLabel>{labelInput}</InputLabel>
                <OutlinedInput
                    label={labelInput}
                    required={true}
                    disabled={disable}
                    type={showPassword ? "text" : "password"}
                    value={pwd}
                    onChange={e => { setPwd(e.target.value) }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="start"
                            >
                                {showPassword ? <VisibilityOff /> : <VisibilityIcon />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </div>);

}

export default PasswordField