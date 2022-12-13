import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice.js";
import smallMenuReducer from "./smallMenuSlice.js";
import snackBarReducer from "./snackBarSlice.js";
import basketReducer from "./basketSlice";
import languageReducer from './languageSlice.js';


import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const persistConfigUser = {
    key: 'user',
    storage,
}

const persistConfigMenu = {
    key: 'menu',
    storage,
}

const persistConfiSnackBar={
    key:"snackBar",
    storage,
}

const persistConfiBasket={
    key:"basket",
    storage,
}

const persistConfiLanguage={
    key:"language",
    storage,
}

const persistedReducerUser = persistReducer(persistConfigUser, userReducer)
const persistedReducerSmallMenu = persistReducer(persistConfigMenu, smallMenuReducer)
const persistedReducerSnackBar = persistReducer(persistConfiSnackBar, snackBarReducer)
const persistedReducerBasket = persistReducer(persistConfiBasket, basketReducer)
const persistedReducerLanguage = persistReducer(persistConfiLanguage, languageReducer)




export const store = configureStore({
    reducer: {
        user: persistedReducerUser,
        isOpen: persistedReducerSmallMenu,
        snackBar: persistedReducerSnackBar,
        basket:persistedReducerBasket,
        language:persistedReducerLanguage
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)