import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const VisitedSlice = createSlice({
  name: "VisitedList",
  initialState,
  reducers: {
    VisitedListAdd(state, action) {
      state.push(action.payload)
    },
    ResetVisited(state) {
      state = initialState
      return state
    }
  }
})

export const { VisitedListAdd, ResetVisited } = VisitedSlice.actions
export default VisitedSlice.reducer 