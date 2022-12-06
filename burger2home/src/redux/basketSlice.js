import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
      initialState: {   basketLines:[ ],
                        quantity:0},
                    // {id:null, name:"", quantity:null, price:null}
    reducers: {

        addToBasketRedux: (state, action) => {
                
                const bl = {
                    idBl: state.quantity,
                    idProduct: action.payload.id,
                    name : action.payload.name,
                    quantity : action.payload.quantity,
                    price : action.payload.price,
                    url: action.payload.url,
                };
                state.quantity = state.quantity + 1;
                state.basketLines = [...state.basketLines, bl];
                return state;
        },

        updateQuantity:(state,action) =>{
            // console.log(state.basketLines[action.payload.index])
            state.basketLines[action.payload.index].quantity =  action.payload.quantity;
            return state;
        },

    },
})

export const { addToBasketRedux,updateQuantity } = basketSlice.actions

export default basketSlice.reducer