import { ValueType } from 'react-select';

import { Loading, Error, Option } from 'store/types';

export type LocationItem = {
  title: string;
  location_type: 'City' | 'Region / State / Province' | 'Country' | 'Continent';
  latt_long: number;
  woeid: number;
  distance: number; // meters
};

export type Locations = {
  list: LocationItem[];
  loading: Loading;
  error: Error;
  selected: Option | null;
};
