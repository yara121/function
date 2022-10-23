import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = action.payload
      localStorage.setItem("address", state.value)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add } = addressSlice.actions

export default addressSlice.reducer
