import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    provider:"",
    name:"",
    email:""
  },
  reducers: {
    login: state => {
      state.isConnected = true
    },
    logout: state => {
      state.isConnected = false
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer