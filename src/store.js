import { configureStore } from "@reduxjs/toolkit"
import addressReducer from "./components/addressSlice"

export const store = configureStore({
  reducer: { address: addressReducer },
})
