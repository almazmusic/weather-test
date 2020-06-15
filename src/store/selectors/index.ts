import { State } from 'store/state';

export const selectState = (state: State) => state;

export const selectGeolocation = (state: State) => state.geolocation;
export const selectLocations = (state: State) => state.locations;
export const selectWeather = (state: State) => state.weather;
