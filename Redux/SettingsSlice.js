import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    talkSpeed: 1,
    voiceName: 'en-gb-x-gba-local',
    voiceGender: 'male',
    timeBetween: 30
}

const SettingsSlice = createSlice({
    name: "SettingsSlice",
    initialState,
    reducers: {
        ToggleGender(state, action) {
            voiceGender = action.payload
        },
        SetVoice(state, action) {
            voiceName = action.payload
        }
    }
})

export const { ToggleGender, SetVoice } = SettingsSlice.actions
export default SettingsSlice.reducer