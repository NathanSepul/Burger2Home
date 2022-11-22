import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice.js";
import smallMenuReducer from "./smallMenuSlice.js";

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

const persistedReducerUser = persistReducer(persistConfigUser, userReducer)
const persistedReducerSmallMenu = persistReducer(persistConfigMenu, smallMenuReducer)


export const store = configureStore({
    reducer: {
        user: persistedReducerUser,
        isOpen: persistedReducerSmallMenu
    },
    middleware: [thunk]
})

export const persistor = persistStore(store)