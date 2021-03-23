import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const VisitedSlice = createSlice({
  name: "VisitedList",
  initialState,
  reducers: {
    VisitedListAdd(state, action) {
      state.push(action.payload)
    }
  }
})

export const { VisitedListAdd } = VisitedSlice.actions
export default VisitedSlice.reducer 