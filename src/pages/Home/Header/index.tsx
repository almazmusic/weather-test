import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select, { ValueType, ActionMeta, InputActionMeta, OptionsType } from 'react-select';

import { Option } from 'store/types';
import { fetchWeatherByWoeid } from 'store/slices/weather';
import { selectState } from 'store/selectors';
import { useDebounce } from 'hooks';
import { fetchLocationsByQuery, setSelectedLocation } from 'store/slices/locations';

import { PageSection } from 'components/PageSection';

import styles from './styles.module.scss';

export const Header: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const { geolocation, locations, weather } = useSelector(selectState, shallowEqual);

  const [options, setOptions] = useState<OptionsType<Option>>([]);

  const fetchLocations = useCallback(async (value: string) => {
    await dispatch(fetchLocationsByQuery(value));
  }, []);

  const fetchLocationsDebounced = useDebounce(fetchLocations, 250);

  const mapOptions = useCallback(() => {
    if (locations.list.length > 0) {
      setOptions(
        locations.list.map((location) => ({ value: location.woeid, label: location.title }))
      );
    }
  }, [locations.list]);

  const getWeatherByWoeid = useCallback(async (woeid: number) => {
    await dispatch(fetchWeatherByWoeid(woeid));
  }, []);

  const handleInputChange = (value: string, actionMeta: InputActionMeta) => {
    const currentOptions = locations.list.filter((item) => item.title.includes(value));

    if (currentOptions.length > 0 || value.length < 3) {
      return;
    }

    fetchLocationsDebounced(value);
  };

  const handleChange = (value: ValueType<Option>, action: ActionMeta<Option>) => {
    // @ts-ignore
    dispatch(setSelectedLocation(value));
    // @ts-ignore
    getWeatherByWoeid(value.value);
  };

  useEffect(() => {
    mapOptions();
  }, [locations.list, mapOptions]);

  useEffect(() => {
    if (locations.loading === 'success' && !locations.selected && options.length > 0) {
      dispatch(setSelectedLocation(options[0]));
      getWeatherByWoeid(Number(options[0].value));
    }
  }, [locations.loading, , locations.selected, options, getWeatherByWoeid]);

  const isLoading = Boolean(locations.loading === 'pending' || geolocation.loading === 'pending');
  const isLoadingWithWeather = isLoading || weather.loading === 'pending';

  return (
    <PageSection outerClass={styles.Header} innerClass={styles.HeaderInner}>
      <div className={styles.Searchbar}>
        <form id="form">
          <h1 className={styles.SearchLabel}>
            <label htmlFor="locations">Search city for weather</label>
          </h1>
          <Select
            className={styles.SearchbarInput}
            name="locations"
            options={options}
            value={locations.selected}
            placeholder={isLoading ? 'Loading...' : 'Start typing city...'}
            isLoading={isLoadingWithWeather}
            isDisabled={isLoadingWithWeather}
            isSearchable
            onInputChange={handleInputChange}
            onChange={handleChange}
          />
        </form>
      </div>
    </PageSection>
  );
};
