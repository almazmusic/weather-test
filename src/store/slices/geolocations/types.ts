import { Loading } from 'store/types';

export type GeolocationMessage =
  | 'Unable to retrieve your location'
  | 'Geolocation is not supported by your browser'
  | PositionError['message'];

export type GeolocationCoords = Pick<Coordinates, 'latitude' | 'longitude'>;

export type UserGeolocation = {
  position: GeolocationCoords | null;
  loading: Loading;
  error: GeolocationMessage | null;
};
