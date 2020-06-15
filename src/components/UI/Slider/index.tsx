import React from 'react';

import styles from './styles.module.scss';

type Props = {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Slider: React.FunctionComponent<Props> = ({ value = 10, onChange, ...rest }) => {
  return (
    <div className={styles.Slider}>
      <input {...rest} type="range" value={value} onChange={onChange} />
    </div>
  );
};
