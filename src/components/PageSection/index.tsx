import React from 'react';
import classnames from 'classnames';

import styles from './styles.module.scss';

type Props = {
  innerClass?: string;
  outerClass?: string;
};

export const PageSection: React.FunctionComponent<Props> = ({
  innerClass,
  outerClass,
  children,
}) => (
  <div className={classnames(outerClass, styles.PageSection)}>
    <div className={classnames(innerClass, styles.PageSectionInner)}>{children}</div>
  </div>
);
