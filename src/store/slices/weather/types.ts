import { LocationItem } from 'store/slices/locations/types';
import { Loading, Error } from 'store/types';

export enum WeatherAbbrs {
  'sn' = 'Snow',
  'sl' = 'Sleet',
  'h' = 'Hail',
  't' = 'Thunderstorm',
  'hr' = 'Heavy Rain',
  'lr' = 'Light Rain',
  's' = 'Showers',
  'hc' = 'Heavy Cloud',
  'lc' = 'Light Cloud',
  'c' = 'Clear',
}

export type ConsolidatedWeather = {
  id: number;
  weather_state_name: string;
  weather_state_abbr: keyof typeof WeatherAbbrs;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
};

export type WeatherSource = {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
};

export type WeatherItem = {
  consolidated_weather: ConsolidatedWeather[];
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: LocationItem;
  sources: WeatherSource[];
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
};

export type Weather = {
  current: WeatherItem | null;
  loading: Loading;
  error: Error;
};
