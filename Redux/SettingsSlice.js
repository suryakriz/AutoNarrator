import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  talkSpeed: 1,
  voiceName: "en-au-x-auc-network",
  voiceLabel: "AUS - Female",
  timeBetween: 5000,
};

const SettingsSlice = createSlice({
  name: "SettingsSlice",
  initialState,
  reducers: {
    SetVoice(state, action) {
      state.voiceName = action.payload.voice;
      state.voiceLabel = action.payload.label;
    },
    SetSpeed(state, action) {
      state.talkSpeed = action.payload;
    },
    SetTimeBetween(state, action) {
      state.timeBetween = action.payload;
    },
  },
});

export const { SetSpeed, SetVoice, SetTimeBetween } = SettingsSlice.actions;
export default SettingsSlice.reducer;
