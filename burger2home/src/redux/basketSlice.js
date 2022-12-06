import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
      initialState: {   products:[ ],
                        quantity:0},
                    // {id:null, name:"", quantity:null, price:null}
    reducers: {
        addToBasketRedux: (state, action) => {
                state.quantity = state.quantity + 1;
                state.products = [...state.products, action.payload];
                return state;
        }

    },
})

export const { addToBasketRedux } = basketSlice.actions

export default basketSlice.reducer