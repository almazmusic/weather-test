import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'store/store';
import { GeolocationCoords } from 'store/slices/geolocations/types';
import { getLocationsByCoords, getLocationsByQuery } from 'api/locations';

import { Option } from 'store/types';

import { Locations, LocationItem } from './types';

const initialState: Locations = {
  list: [],
  loading: 'idle',
  error: null,
  selected: null,
};

export const locations = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    getLocationsPending: (state) => {
      state.error = null;
      state.loading = 'pending';
    },
    getLocationsSuccess: (state, action: PayloadAction<LocationItem[]>) => {
      state.error = null;
      state.list = action.payload;
      state.loading = 'success';
    },
    getLocationsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = 'error';
    },
    setSelectedLocation: (state, action: PayloadAction<Option>) => {
      state.selected = action.payload;
    },
  },
});

export const {
  getLocationsError,
  getLocationsPending,
  getLocationsSuccess,
  setSelectedLocation,
} = locations.actions;

export const fetchLocationsByQuery = (query: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getLocationsPending());

    const locations = await getLocationsByQuery(query);

    dispatch(getLocationsSuccess(locations));
  } catch (e) {
    dispatch(getLocationsError(e));
  }
};

export const fetchLocationsByCoords = (coords: GeolocationCoords): AppThunk => async (dispatch) => {
  try {
    dispatch(getLocationsPending());

    const locations = await getLocationsByCoords(coords);

    dispatch(getLocationsSuccess(locations));
  } catch (e) {
    dispatch(getLocationsError(e));
  }
};
