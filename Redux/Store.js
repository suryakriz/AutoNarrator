import { configureStore } from '@reduxjs/toolkit'
import { VisitedListAdd } from './VisitedSlice'
import VisitedReducer from './VisitedSlice'
import SettingsReducer from './SettingsSlice'

const store = configureStore({ 
    reducer: {
        visited: VisitedReducer,
        settings: SettingsReducer
    }
})

//console.log(VisitedListAdd)

export default store