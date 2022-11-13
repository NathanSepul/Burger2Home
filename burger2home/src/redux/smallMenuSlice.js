import { createSlice } from '@reduxjs/toolkit'

export const smallMenuSlice = createSlice({
  name: 'isOpen',
  initialState: {
    value: false
  },
  reducers: {
    setIsOpen: (state,action) => {
      state.value = action.payload
    }
  }
})


export const {setIsOpen} = smallMenuSlice.actions

export default smallMenuSlice.reducer