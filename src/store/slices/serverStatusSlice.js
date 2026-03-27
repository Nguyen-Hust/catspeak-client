import { createSlice } from "@reduxjs/toolkit"

const serverStatusSlice = createSlice({
  name: "serverStatus",
  initialState: {
    isServerDown: false,
  },
  reducers: {
    setServerDown: (state) => {
      state.isServerDown = true
    },
    setServerUp: (state) => {
      state.isServerDown = false
    },
  },
})

export const { setServerDown, setServerUp } = serverStatusSlice.actions

export const selectIsServerDown = (state) => state.serverStatus.isServerDown

export default serverStatusSlice.reducer
