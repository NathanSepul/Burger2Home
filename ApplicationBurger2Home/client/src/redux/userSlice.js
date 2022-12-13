import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    provider:"",
    email:"",
    firstName:"",
    lastName:"",
    birthday:"",
    role:""
  },
  reducers: {
    login: (state,action) => {
      return state = {
        isConnected : true,
        provider : action.payload.provider,
        email :  action.payload.email,
        firstName :  action.payload.firstName,
        lastName: action.payload.lastName,
        birthday: action.payload.birthday,
        role: action.payload.role
        
      }
    },
    logout: state => {
      return state = {
        isConnected : false,
        provider : "",
        email :  "",
        firstName :   "",
        lastName:  "",
        birthday:"",
        role:  ""
      }
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer