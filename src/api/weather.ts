import { WeatherItem } from 'store/slices/weather/types';

import { client } from './cleint';

const weatherUrl = '/location';

export const getWeather = (woeid: number): Promise<WeatherItem> =>
  client.get(`${weatherUrl}/${woeid}/`);
