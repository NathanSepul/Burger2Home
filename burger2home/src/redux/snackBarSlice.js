import { createSlice } from '@reduxjs/toolkit'

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState: {
    // isOpen: false,
    // msg:"not initialised",
    // severity:"success",
  },
  reducers: {
    open: (state,action) => {
      return state = {
        isOpen : true,
        msg : action.payload.msg,
        severity :  action.payload.severity,
      }
    },
    close: state => {
      return state = {
        isOpen : false,
        msg : "",
        severity : state.severity,
      }
    }
  }
})

export const { open, close } = snackBarSlice.actions

export default snackBarSlice.reducer