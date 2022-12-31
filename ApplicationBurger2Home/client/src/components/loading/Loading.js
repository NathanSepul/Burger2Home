import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import "./Loading.css"

const Loading = () => {
    return (
        <Box className="loader" sx={{ display: 'flex', justifyContent:"center",   minHeight: "calc(100vh - 300px)"}}>
            <CircularProgress className="loaderIcon"/>
        </Box>
    );
}

export default Loading