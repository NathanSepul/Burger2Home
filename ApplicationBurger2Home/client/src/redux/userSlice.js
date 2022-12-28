import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    provider: "",
    email: "",
    firstName: "",
    lastName: "",
    birthday: "",
    role: "",
    basket: [],
    basketSize: 0
  },
  reducers: {
    login: (state, action) => {
      return state = {
        isConnected: true,
        provider: action.payload.provider,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        birthday: action.payload.birthday,
        role: action.payload.role

      }
    },
    logout: state => {
      return state = {
        isConnected: false,
        provider: "",
        email: "",
        firstName: "",
        lastName: "",
        birthday: "",
        role: "",
        basket: null,
        basketSize: 0
      }
    },
    loginBasket: (state, action) => {
      state.basket = action.payload.basket;
      state.basketSize = action.payload.size;

      return state
    },

    updateBasket: (state, action) => {
      state.basket = action.payload.basket;
      state.basketSize = action.payload.size;

      return state
    },

    updateQt: (state, action) => {

      let index = action.payload.index
      state.basket.basketLines[index].amount = action.payload.newQuantity

      axios.put(`/basketLines`, state.basket.basketLines[index])
        .then(res => console.log(res))
        .catch(e => console.log(e))

    },

    addToBasketUser: (state, action) => {
      state.basket.basketLines.push(action.payload.bl);
      state.basketSize = state.basketSize + 1;
    },

    removeBasketLine: (state, action) => {
      let idBL = state.basket.basketLines[action.payload].id
      state.basket.basketLines = [
        ...state.basket.basketLines.slice(0, action.payload),
        ...state.basket.basketLines.slice(action.payload + 1)];
      state.basketSize = state.basketSize - 1;
      axios.delete(`/basketLines/${idBL}`)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    },
  }
})

export const { login, logout, loginBasket, addToBasketUser, updateQt, updateBasket, removeBasketLine } = userSlice.actions

export default userSlice.reducer