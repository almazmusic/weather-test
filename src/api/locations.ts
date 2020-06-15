import { LocationItem } from 'store/slices/locations/types';
import { GeolocationCoords } from 'store/slices/geolocations/types';

import { client } from './cleint';

const searchUrl = '/location/search';

export const getLocationsByQuery = (query: string): Promise<LocationItem[]> =>
  client.get(searchUrl, { params: { query: query } });

export const getLocationsByCoords = (coords: GeolocationCoords): Promise<LocationItem[]> =>
  client.get(searchUrl, { params: { lattlong: `${coords.latitude}, ${coords.longitude}` } });
