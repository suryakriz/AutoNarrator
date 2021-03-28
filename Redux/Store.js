import { configureStore } from '@reduxjs/toolkit'
import VisitedReducer from './VisitedSlice'
import SettingsReducer from './SettingsSlice'
import PastTripsReducer from './PastTripsSlice'

const store = configureStore({ 
    reducer: {
        visited: VisitedReducer,
        settings: SettingsReducer,
        pastTrips: PastTripsReducer
    }
})

export default store