import React, { ButtonHTMLAttributes } from "react";
import cx from "classnames";

const Button = (
  props: {
    children: React.ReactNode;
    className?: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { children, className, ...rest } = props;
  return (
    <button
      className={cx(
        "hover:bg-stone-800 p-2 border hover:border-stone-800",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
