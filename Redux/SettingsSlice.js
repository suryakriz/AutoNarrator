import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    talkSpeed: 1,
    voiceName: 'en-us-x-sfg#female_3-local',
    voiceGender: 'male',
    timeBetween: 30
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        ToggleGender(state, action) {
            state.voiceGender = action.payload
        },
        SetVoice(state, action) {
            state.voiceName = action.payload
        }
    }
})

export const { ToggleGender, SetVoice } = SettingsSlice.actions
export default SettingsSlice.reducer