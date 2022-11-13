import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'isConnected',
  initialState: {
    value: false
  },
  reducers: {
    login: state => {
      state.value = true
    },
    logout: state => {
      state.value = false
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer