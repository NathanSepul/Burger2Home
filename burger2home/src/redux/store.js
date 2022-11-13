import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice.js";
import smallMenuReducer from "./smallMenuSlice.js"
;


export default configureStore({
    reducer: {
        isConnected: userReducer,
        isOpen: smallMenuReducer
    }
  })