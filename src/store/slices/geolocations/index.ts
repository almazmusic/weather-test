import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AppThunk } from 'store/store';

import { GeolocationCoords, UserGeolocation, GeolocationMessage } from './types';

const initialState: UserGeolocation = {
  position: null,
  loading: 'idle',
  error: null,
};

export const geolocation = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requestGeolocationPending: (state) => {
      state.error = null;
      state.loading = 'pending';
      state.position = null;
    },
    requestGeolocationSuccess: (state, action: PayloadAction<GeolocationCoords>) => {
      state.error = null;
      state.loading = 'success';
      state.position = action.payload;
    },
    requestGeolocationError: (state, action: PayloadAction<GeolocationMessage>) => {
      state.error = action.payload;
      state.loading = 'error';
      state.position = null;
    },
  },
});

export const {
  requestGeolocationPending,
  requestGeolocationError,
  requestGeolocationSuccess,
} = geolocation.actions;

export const requestGeolocation = (): AppThunk => async (dispatch) => {
  dispatch(requestGeolocationPending());

  const success = (position: Position) => {
    dispatch(
      requestGeolocationSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    );
  };

  const error = (error: PositionError) => {
    dispatch(requestGeolocationError(error.message));
  };

  if (!navigator.geolocation) {
    dispatch(requestGeolocationError('Geolocation is not supported by your browser'));
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
};
