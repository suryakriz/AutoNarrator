import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    talkSpeed: 1,
    voiceName: "en-us-x-sfg#female_3-local",
    voiceLabel: "US - Female",
    timeBetween: 30000
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        SetVoice(state, action) {
            state.voiceName = action.payload.voice
            state.voiceLabel = action.payload.label
        },
        SetSpeed(state, action) {
            state.talkSpeed = action.payload
        },
        SetTimeBetween(state, action) {
            state.timeBetween = action.payload
        },
        ResetSettings(state) {
            state = initialState
            return state
        }
    }
})

export const { SetSpeed, SetVoice, SetTimeBetween, ResetSettings } = SettingsSlice.actions
export default SettingsSlice.reducer