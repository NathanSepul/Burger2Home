import React from "react";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import "./Supplement.css";

const Supplement = () => {

    return (
        <FormControl sx={{ m: 0, color:"black" }} component="fieldset" variant="outlined" className="extra">
            <FormLabel className="titleExtra"component="legend" style={{color: "black"}}>Supplément</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox name="oignonsRings" size="small" style={{color: "#2D2D2D"}}/>
                    }
                    label={<div><span className="ExtraValue" >Oignons Ring</span> <span>2€</span></div>}                    
                />
                <FormControlLabel
                    control={
                        <Checkbox  name="doubleFromages" size="small" style={{color: "#2D2D2D"}}/>
                    }
                    label={<div><span className="ExtraValue" >Double Fromages</span> <span>2€</span></div>}
                />
            </FormGroup>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox  name="doubleViandes" size="small" style={{color: "#2D2D2D"}}/>
                    }
                    label={<div><span className="ExtraValue">Double Viandes</span> <span>2€</span></div>}
                />

                <FormControlLabel
                    control={
                        <Checkbox  name="sansFromage" size="small" style={{color: "#2D2D2D"}}/>
                    }
                    label={<div><span className="ExtraValue">Sans Fromage</span></div>}
                />
                
            </FormGroup>
            {/* <FormHelperText>Be careful</FormHelperText> */}
        </FormControl>
    );


}

export default Supplement