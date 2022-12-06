import { createSlice } from '@reduxjs/toolkit'

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState: {
    isOpen: false,
    msg:"nott initialised",
    severity:"success",
  },
  reducers: {
    open: (state,action) => {
      return state = {
        isOpen : true,
        msg : action.payload.msg,
        severity :  action.payload.type,
      }
    },
    close: state => {
      return state = {
        isConnected : false,
      }
    }
  }
})

export const { open, close } = snackBarSlice.actions

export default snackBarSlice.reducer