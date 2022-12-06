import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    provider:"",
    name:"",
    email:"",
    birthday:""
  },
  reducers: {
    login: (state,action) => {
      return state = {
        isConnected : true,
        provider : action.payload.provider,
        email :  action.payload.email,
        name :  action.payload.name,
        birthday: action.payload.birthday,
      }
    },
    logout: state => {
      return state = {
        isConnected : false,
        provider : "",
        email : "",
        name :  "",
        birthday:""
      }
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer