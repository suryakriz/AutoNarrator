import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const PastTripsSlice = createSlice({
  name: "PastTripsList",
  initialState,
  reducers: {
    PastTripsAdd(state, action) {
      state.push(action.payload)
    },
    AddLandmarkToTrip(state, action) {
        let trip = state.filter((item) => item.id == action.payload.id)
        trip.landmarks.push(action.payload.landmark);
    },
    ResetPastTrips(state) {
        let curState = state
        state = initialState
        return state
    }
  }
})

export const { PastTripsAdd, AddLandmarkToTrip, ResetPastTrips } = PastTripsSlice.actions
export default PastTripsSlice.reducer 