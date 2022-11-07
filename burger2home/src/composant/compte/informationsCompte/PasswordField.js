import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";

import "./PasswordField.css"

const PasswordField = ({disable,pwd,setPwd}) => {

    const [type,setType] = useState("password");


    const handleSetType = () => {
        type==="text" ? setType("password") : setType("text")
    } 

    return(
        <div className="passwordDiv">
            <TextField disabled={disable} className="inputPassword" required type={type} label="password" variant="outlined" value={pwd} onChange={e => {setPwd(e.target.value)} } />
            
            {(type==="password") && (
               <Button disabled={disable} onClick={handleSetType}><VisibilityIcon/> </Button>
            )}

            {(type==="text") && (
                <Button disabled={disable} onClick={handleSetType}><VisibilityOff/> </Button>
            )}
            
           
            
        </div>);

}

export default PasswordField