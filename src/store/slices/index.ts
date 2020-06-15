import { combineReducers } from '@reduxjs/toolkit';

import { geolocation } from './geolocations';
import { locations } from './locations';
import { weather } from './weather';

export const RootReducer = combineReducers({
  geolocation: geolocation.reducer,
  locations: locations.reducer,
  weather: weather.reducer,
});

export type RootState = ReturnType<typeof RootReducer>;
