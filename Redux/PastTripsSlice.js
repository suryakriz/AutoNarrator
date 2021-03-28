import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        tripdate: "01/04/2021",
        triplength: "1 hour",
        numlandmarks: "3 landmarks",
        id: "1"
      },
      {
        tripdate: "02/22/2021",
        triplength: "10 minutes",
        numlandmarks: "1 landmark",
        landmarks: [ 
            {
                landmarkName: "Texas A&M Core of Cadets",
                landmarkDescription: "Soon after its opening in 1876, the Agricultural and Mechanical College of" +
                 " Texas (Texas A&M) established the Corps of Cadets to fulfill its mandate to instruct its students"+
                 " (all-male until the early 1960s) in military science. A&M contributed more officers to America's WW" +
                 " II effort than any other institution, including the U.S. Military Academy. Many of the Corps' traditional" +
                 " activities, such as the Aggie Band, Fish Drill Team, and Ross Volunteers, have gained national and" +
                 " international recognition. A&M's elite Corps of Cadets continues to dominate the University's unique public image."
            }
            

        ],
        id: "2"
      },
      {
        tripdate: "03/04/2021",
        triplength: "45 minutes",
        numlandmarks: "4 landmarks",
        id: "3"
      },
      {
        tripdate: "03/23/2021",
        triplength: "30 minutes",
        numlandmarks: "2 landmarks",
        id: "4"
      }
]

export const PastTripsSlice = createSlice({
  name: "PastTripsList",
  initialState,
  reducers: {
    PastTripsAdd(state, action) {
      state.push(action.payload)
    }
  }
})

export const { PastTripsAdd } = PastTripsSlice.actions
export default PastTripsSlice.reducer 