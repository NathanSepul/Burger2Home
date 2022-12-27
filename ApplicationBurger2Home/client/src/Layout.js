import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./components/header/Header.js";
import Footer from "./components/footer/Footer.js";
import Snackbar from '@mui/material/Snackbar';
import { close } from './redux/snackBarSlice.js';
import { useSelector, useDispatch} from 'react-redux';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Layout = () => {

  const snackBar = useSelector(state => state.snackBar)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(close())
  };


  return (
    <>
      <Header />

      <Snackbar
        open={snackBar.isOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={ {vertical: 'bottom', horizontal: 'right'}}
      >
        <Alert onClose={handleClose} severity= {snackBar.severity}>
          {snackBar.msg}
        </Alert>
      </Snackbar>

      <Outlet />

      <Footer />
    </>
  );
};

export default Layout;
