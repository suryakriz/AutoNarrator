import { createSlice } from '@reduxjs/toolkit'

const initialState = [
      {
        tripdate: "02/22/2021",
        triplength: "10 minutes",
        starttime: "3:00 P.M.",
        endtime: "3:10 P.M.",
        numlandmarks: "2",
        landmarks: [ 
            {
                landmarkNumber: "1",
                landmarkName: "Texas A&M Core of Cadets",
                landmarkDescription: "Soon after its opening in 1876, the Agricultural and Mechanical College of" +
                 " Texas (Texas A&M) established the Corps of Cadets to fulfill its mandate to instruct its students"+
                 " (all-male until the early 1960s) in military science. A&M contributed more officers to America's WW" +
                 " II effort than any other institution, including the U.S. Military Academy. Many of the Corps' traditional" +
                 " activities, such as the Aggie Band, Fish Drill Team, and Ross Volunteers, have gained national and" +
                 " international recognition. A&M's elite Corps of Cadets continues to dominate the University's unique public image."
            },
            {
                landmarkNumber: "2",
                landmarkName: "Chemistry Building",
                landmarkDescription: "The Chemistry Building (1929) was designed by S. C. P. Vosper, using classical design" +
                " proportions and details. It was extended to the east in 1981 and 1988. The ornamentation uses a variety of" +
                " color schemes in tile patterns inspired from the art of the Mexican Americans, and includes patterns of animal" +
                " heads, skulls, bones and fossils. The main entrance has a monumental stair leading to pedimented doorways." +
                " The entry ceiling has intricate painted gold grillwork against a background of dark panels with complementary lighting fixtures."
            }
            

        ],
        id: "0"
      },
]

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
        state = initialState
    }
  }
})

export const { PastTripsAdd, AddLandmarkToTrip, ResetPastTrips } = PastTripsSlice.actions
export default PastTripsSlice.reducer 