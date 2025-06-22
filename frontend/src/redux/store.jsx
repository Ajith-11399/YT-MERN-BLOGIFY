import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "../redux/user/userSlice";
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user: useReducer,
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}

const persistReduce = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistReduce,
    middleware: ( getDefaultMiddleware ) => 
        getDefaultMiddleware({serializableCheck: false})
});

export const persistor = persistStore(store);