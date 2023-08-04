import { forwardRef, HTMLProps } from "react";

import classnames from "classnames";

import styles from "./Input.module.scss";

interface Props extends HTMLProps<HTMLInputElement> {
  className?: string;
  wrapperClassname?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ wrapperClassname, className, label, error, ...props }, ref) => (
    <div className={classnames(styles.wrapper, wrapperClassname)}>
      {!!label && <label className={styles.label}>{label}</label>}
      <input
        className={classnames(styles.input, className, {
          [styles.inputError]: !!error,
        })}
        ref={ref}
        {...props}
      />
      {!!error && <label className={styles.error}>{error}</label>}
    </div>
  ),
);

export default Input;
