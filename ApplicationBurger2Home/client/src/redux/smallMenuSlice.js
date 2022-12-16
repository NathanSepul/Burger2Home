import { createSlice } from '@reduxjs/toolkit'

export const smallMenuSlice = createSlice({
  name: 'isOpen',
  initialState: {
    value: false
  },
  reducers: {
    setIsOpen: (state,action) => {
      state.value = action.payload
    },
    setClose: (state) =>{
      state.value = false
    }
  }
})


export const {setIsOpen,setClose} = smallMenuSlice.actions

export default smallMenuSlice.reducer