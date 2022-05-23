import { configureStore } from '@reduxjs/toolkit';

import canvasReducer from './canvas';

const reducer = {
  canvas: canvasReducer
};

export default configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});