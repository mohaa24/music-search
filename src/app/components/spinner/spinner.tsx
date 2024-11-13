import React from "react";

import styles from "./spinner.module.css";

type TSpinnerProps = {
  color?: string;
  size?: string | number;
};

const Spinner = ({ color, size = 10 }: TSpinnerProps): JSX.Element => {
  const spinnerStyles: any = color
    ? {
        "--spinner-color": color,
      }
    : {};
  return (
    <div
      className={styles.spinner}
      style={{ width: `${size}px`, height: `${size}px`, ...spinnerStyles }}
    />
  );
};

export default Spinner;
