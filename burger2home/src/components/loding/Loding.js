import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./Loding.css"

const Loding = () => {
    return (
        <Box className="loader" sx={{ display: 'flex', justifyContent:"center",   minHeight: "calc(100vh - 300px)"}}>
            <CircularProgress className="loaderIcon"/>
        </Box>
    );
}

export default Loding