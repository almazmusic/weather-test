import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store/store';

import { Weather, WeatherItem } from './types';
import { getWeather } from 'api/weather';

const initialState: Weather = {
  error: null,
  loading: 'idle',
  current: null,
};

export const weather = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    getWeatherPending: (state) => {
      state.error = null;
      state.loading = 'pending';
    },
    getWeatherSuccess: (state, action: PayloadAction<WeatherItem>) => {
      state.error = null;
      state.loading = 'success';
      state.current = action.payload;
    },
    getWeatherError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = 'error';
      state.current = null;
    },
  },
});

export const { getWeatherError, getWeatherPending, getWeatherSuccess } = weather.actions;

export const fetchWeatherByWoeid = (woeid: number): AppThunk => async (dispatch) => {
  try {
    dispatch(getWeatherPending());

    const weather = await getWeather(woeid);

    dispatch(getWeatherSuccess(weather));
  } catch (e) {
    dispatch(getWeatherError(e));
  }
};
