import { configureStore } from '@reduxjs/toolkit'
import VisitedReducer from './VisitedSlice'
import SettingsReducer from './SettingsSlice'
import PastTripsReducer from './PastTripsSlice'
import { loadState, saveState } from './LocalStorage'
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = configureStore({ 
    reducer: {
        visited: VisitedReducer,
        settings: SettingsReducer,
        pastTrips: PastTripsReducer
    }
}, persistedState)

store.subscribe(throttle(() => {
    saveState({
      visited: store.getState().visited,
      settings: store.getState().settings,
      pastTrips: store.getState().pastTrips,
    });
  }, 1000));

export default store