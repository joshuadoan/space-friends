import React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import cx from "classnames";
const StyledNavLink = (props: NavLinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        cx("hover:underline p-2", {
          "bg-purple-800  ": isActive,
        })
      }
      {...props}
    >
      {props.children}
    </NavLink>
  );
};

export default StyledNavLink;
