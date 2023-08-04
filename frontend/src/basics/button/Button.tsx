import { forwardRef, ElementType, ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<ElementType> {
  as?: ElementType;
  to?: string;
  href?: string;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { className, as: Component = "button", type = "button", to, ...props },
    ref,
  ) => (
    <Component
      ref={ref}
      className={classnames(styles.button, className, {
        [styles.disabledButton]: !!props.disabled,
      })}
      type={Component === "button" ? type : undefined}
      to={to && !props.disabled ? to : ""}
      {...props}
    />
  ),
);

export default Button;
