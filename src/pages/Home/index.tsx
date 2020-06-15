import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import interpolate from 'color-interpolate';

import { requestGeolocation } from 'store/slices/geolocations';
import { fetchLocationsByCoords } from 'store/slices/locations';
import { selectState } from 'store/selectors';
import { tempToPercent } from 'utils';

import { Slider } from 'components/UI/Slider';

import { Header } from './Header';
import { Weather } from './Weather';
import styles from './styles.module.scss';

const colorSet = interpolate(['#00ffff', '#fff700', '#ff8c00']);

export const HomePage: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { geolocation, weather } = useSelector(selectState, shallowEqual);
  const [temp, setTemp] = useState(10);
  const [color, setColor] = useState('#fff700');

  const fetchUserWeather = useCallback(async () => {
    if (!geolocation.position) {
      await dispatch(requestGeolocation());
    }

    if (geolocation.position?.latitude && geolocation.position?.longitude) {
      const { latitude, longitude } = geolocation.position;
      await dispatch(fetchLocationsByCoords({ latitude, longitude }));
    }
  }, [geolocation.position]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemp(Number(event.target.value));
  };

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  useEffect(() => {
    setColor(colorSet(tempToPercent(temp) / 100));
  }, [temp]);

  useEffect(() => {
    if (weather.current?.consolidated_weather[0].the_temp) {
      setTemp(weather.current?.consolidated_weather[0].the_temp!);
    }
  }, [weather.current?.consolidated_weather[0].the_temp]);

  useEffect(() => {
    fetchUserWeather();
  }, [fetchUserWeather]);

  return (
    <div className={styles.Page}>
      <Header />
      <Weather />
      <Slider onChange={handleSliderChange} value={temp} id="temp" name="temp" min="-10" max="30" />
    </div>
  );
};
