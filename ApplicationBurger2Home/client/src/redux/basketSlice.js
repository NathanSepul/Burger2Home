import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
      initialState: {   basketLines:[ ],
                        quantity:0
                    },
                    // {id:null, name:"", quantity:null, price:null}
    reducers: {

        addToBasketRedux: (state, action) => {

                let alreadyInside = false
                state.basketLines.forEach( (bl) => {
                    if(bl.productId === action.payload.productId) {
                        bl.quantity = parseInt(bl.quantity) + parseInt(action.payload.quantity)
                        alreadyInside = true;
                        return state;
                    }
                })
                
                if(!alreadyInside){
                    const bl = {
                        id:null,
                        basketId:null,
                        productId: action.payload.productId,
                        quantity : action.payload.quantity,
                    };
    
                    state.quantity = state.quantity + 1;
                    state.basketLines = [...state.basketLines, bl];
                    return state;
                }
                
        },

        updateQuantity:(state,action) =>{
            // console.log(state.basketLines[action.payload.index])
            state.basketLines[action.payload.index].quantity =  action.payload.quantity;
            return state;
        },

        removeFromBasket:(state,action) =>{
            state.basketLines = [ 
                ...state.basketLines.slice(0, action.payload),
                ...state.basketLines.slice(action.payload + 1)];
                state.quantity = state.quantity - 1;
        },

        removeAll:(state) =>{
            state.basketLines = [ ];
            state.quantity = 0;

            return state;
        }

    },
})

export const { addToBasketRedux,updateQuantity, removeFromBasket,removeAll} = basketSlice.actions

export default basketSlice.reducer