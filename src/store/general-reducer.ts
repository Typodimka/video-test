import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type SliceState = {
  isPlaying: boolean;
  updateEvents: UpdateEventType[]
};

const initialState: SliceState = {
  isPlaying: false,
  updateEvents: []
};

const slice = createSlice({
  name: 'general',
  initialState,

  reducers: {
    setIsPlaying(state: SliceState, actions: PayloadAction<boolean>) {
      state.isPlaying = actions.payload
    },
    setUpdateEvents(state: SliceState, actions: PayloadAction<any[]>) {
      state.updateEvents = actions.payload
    },
  }
});

export const generalReducer = slice.reducer;

export const {
  setIsPlaying,
  setUpdateEvents,
} = slice.actions;

export interface UpdateEventType {
  timestamp: number,
  endTime: number,
  duration: number,
  zone: {
    left: number,
    top: number,
    width: number,
    height: number
  }
}