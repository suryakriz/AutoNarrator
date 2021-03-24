import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    talkSpeed: 1,
    voiceName: 'en-us-x-sfg#female_3-local',
    timeBetween: 30
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        SetVoice(state, action) {
            state.voiceName = action.payload
        },
        SetSpeed(state, action) {
            state.talkSpeed = action.payload
        },
        SetTimeBetween(state, action) {
            state.timeBetween = action.payload
        },
    }
})

export const { SetSpeed, SetVoice, SetTimeBetween } = SettingsSlice.actions
export default SettingsSlice.reducer