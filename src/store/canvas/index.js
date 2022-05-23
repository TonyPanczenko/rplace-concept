import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  pixels: [],
  selectedPixelId: null,
  timeUserPlacedPixel: 0
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setPixels(state, action) {
      state.pixels = action.payload;
    },
    addPixel(state, action) {
      state.pixels.push(action.payload.pixel);
      state.timeUserPlacedPixel = action.payload.timestamp;
    },
    setSelectedPixel(state, action) {
      state.selectedPixelId = action.payload;
    }
  }
});

export const { setPixels, addPixel, setSelectedPixel } = canvasSlice.actions;
export default canvasSlice.reducer;