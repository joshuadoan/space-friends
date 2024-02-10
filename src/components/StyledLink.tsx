import React from "react";
import { NavLink, LinkProps } from "react-router-dom";
import cx from "classnames";
const StyledLink = (props: LinkProps) => {
  return (
    <NavLink className={cx("hover:underline p-2", props.className)} {...props}>
      {props.children}
    </NavLink>
  );
};

export default StyledLink;
