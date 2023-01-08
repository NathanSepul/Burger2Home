import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basketLines: [],
        basketSize: 0
    },
    // {id:null, name:"", quantity:null, price:null}
    reducers: {

        addToBasketRedux: (state, action) => {

            let alreadyInside = false

            state.basketLines.forEach((bl) => {
                if (bl.productId === action.payload.productId) {
                    bl.amount = parseInt(bl.amount) + parseInt(action.payload.quantity)
                    alreadyInside = true;
                    return state;
                }
            })

            if (!alreadyInside) {
                const bl = {
                    id: null,
                    basketId: null,
                    productId: action.payload.productId,
                    amount: action.payload.quantity,
                };

                state.basketSize = state.basketSize + 1;
                state.basketLines = [...state.basketLines, bl];
                return state;
            }

        },

        updateQuantity: (state, action) => {
            let index = action.payload.index
            state.basketLines[index].amount = action.payload.newQuantity
            return state;
        },


        removeFromBasket: (state, action) => {
            let indexBl = state.basketLines.findIndex(a => a.productId === action.payload)
            let tempL = state.basketLines
            tempL.splice(indexBl, 1)
            state.basketLines = tempL;
            state.basketSize = state.basketSize - 1;
        },

        removeAll: (state) => {
            state.basketLines = [];
            state.basketSize = 0;

            return state;
        }

    },
})

export const { addToBasketRedux, updateQuantity, removeFromBasket, removeAll } = basketSlice.actions

export default basketSlice.reducer