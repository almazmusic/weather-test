import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { WeatherAbbrs } from 'store/slices/weather/types';
import { selectState } from 'store/selectors';
import { STATIC_URL } from 'constants/urls';

import styles from './styles.module.scss';

const ICON_URL = (name: keyof typeof WeatherAbbrs) => `${STATIC_URL}/img/weather/${name}.svg`;

export const Weather: React.FunctionComponent = () => {
  const { geolocation, locations, weather } = useSelector(selectState, shallowEqual);

  const isNewWeatherNeedsTobeLoaded = !(
    locations.loading === 'success' &&
    locations.list.filter((item) => item.woeid === weather.current?.woeid).length > 0
  );

  return (
    <div className={styles.Weather}>
      {geolocation.loading === 'pending' && (
        <div className={styles.WeatherLoading}>Requesting geolocation future...</div>
      )}
      {locations.loading === 'pending' && (
        <div className={styles.WeatherLoading}>Getting locations nearby...</div>
      )}
      {weather.loading === 'pending' && (
        <div className={styles.WeatherLoading}>Loading weather for nearest position...</div>
      )}
      {weather.loading === 'success' &&
        locations.loading === 'success' &&
        isNewWeatherNeedsTobeLoaded && (
          <div className={styles.WeatherLoading}>Select new location to display the weather...</div>
        )}
      {weather.loading === 'success' &&
        locations.loading !== 'pending' &&
        !isNewWeatherNeedsTobeLoaded &&
        weather.current && (
          <div className={styles.WeatherInfo}>
            <p>
              It's{' '}
              <span className={styles.Temp}>
                {weather.current?.consolidated_weather[0].the_temp.toFixed(1)} C&deg;
              </span>{' '}
              in
            </p>
            <h2 className={styles.City}>{weather.current?.title}</h2>
            <p>
              and it's{' '}
              {WeatherAbbrs[
                weather.current?.consolidated_weather[0].weather_state_abbr
              ].toLowerCase()}
            </p>
            <div>
              <img
                src={ICON_URL(weather.current?.consolidated_weather[0].weather_state_abbr)}
                alt={WeatherAbbrs[weather.current?.consolidated_weather[0].weather_state_abbr]}
              />
            </div>
          </div>
        )}
    </div>
  );
};
