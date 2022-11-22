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
    login: (state,action) => {
      return state = {
        isConnected : true,
        provider : action.payload.provider,
        email :  action.payload.email,
        name :  action.payload.name
      }
    },
    logout: state => {
      return state = {
        isConnected : false,
        provider : "",
        email : "",
        name :  "",
      }
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer