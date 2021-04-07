import { createStore, combineReducers } from '@reduxjs/toolkit'
import VisitedReducer from './VisitedSlice'
import SettingsReducer from './SettingsSlice'
import PastTripsReducer from './PastTripsSlice'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

rootReducer = combineReducers({
    visited: VisitedReducer,
    settings: SettingsReducer,
    pastTrips: PastTripsReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}
   
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persister = persistStore(store)
    return { store, persister }
}