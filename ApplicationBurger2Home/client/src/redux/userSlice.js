import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isConnected: false,
    id: null,
    provider: "",
    role: "",
    basket: [],
    basketSize: 0
  },
  reducers: {
    login: (state, action) => {
      return state = {
        isConnected: true,
        id: action.payload.id,
        provider: action.payload.provider,
        role: action.payload.role

      }
    },
    logout: state => {
      return state = {
        isConnected: false,
        id: null,
        provider: "",
        email: "",
        role: "",
        basket: null,
        basketSize: 0
      }
    },
    loginBasket: (state, action) => {
      state.basket = action.payload.basket;
      if (state.basket.basketLines === null) {
        state.basket.basketLines = []
      }
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
      let indexBl =  state.basket.basketLines.findIndex(a => a.productId === action.payload)
      let idBL = state.basket.basketLines[indexBl].id
      let tempL = state.basket.basketLines
      tempL.splice(indexBl, 1)
      state.basket.basketLines = tempL
      state.basketSize = state.basketSize - 1;
      
      axios.delete(`/basketLines/${idBL}`)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    },
  }
})

export const { login, logout, loginBasket, addToBasketUser, updateQt, updateBasket, removeBasketLine } = userSlice.actions

export default userSlice.reducer