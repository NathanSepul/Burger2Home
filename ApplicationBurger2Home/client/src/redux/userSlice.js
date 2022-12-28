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

    addToBasketUser: (state, action) => {

      let alreadyInside = false

      state.basket.basketLines.forEach((bl) => {

        if (bl.productId === action.payload.productId) {
          bl.amount = parseInt(bl.amount) + parseInt(action.payload.quantity)
          alreadyInside = true;

          axios.put(`/basketLines`,bl)
            .then(res => console.log(res))
            .catch(e => console.log(e))
        }
      })

      if (!alreadyInside) {
        const bl = {
          id: null,
          basketId: state.basket.id,
          productId: action.payload.productId,
          amount: action.payload.quantity,
        };

        axios.post(`/basketLines`,bl)
          .then(res =>{
            console.log("new")
            console.log(res.data)
            // state.basketSize = state.basketSize + 1;
            state.basket.basketLines.push(bl);
          })
          .then(() => console.log("hhhh"))
          .catch(e => console.log(e))
      }

    }
  }
})

export const { login, logout, loginBasket, addToBasketUser } = userSlice.actions

export default userSlice.reducer