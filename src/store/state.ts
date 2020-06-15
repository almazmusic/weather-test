import { UserGeolocation } from './slices/geolocations/types';
import { Locations } from './slices/locations/types';
import { Weather } from './slices/weather/types';

export type State = {
  geolocation: UserGeolocation;
  locations: Locations;
  weather: Weather;
};
