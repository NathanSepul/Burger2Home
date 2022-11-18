import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice.js";
import smallMenuReducer from "./smallMenuSlice.js"
;


export default configureStore({
    reducer: {
        userConnected: userReducer,
        isOpen: smallMenuReducer
    }
  })