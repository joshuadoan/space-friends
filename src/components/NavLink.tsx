import React from "react";
import { NavLink as ReactDomNavLink, NavLinkProps } from "react-router-dom";
import cx from "classnames";
const NavLink = (props: NavLinkProps) => {
  return (
    <ReactDomNavLink
      className={({ isActive }) =>
        cx("hover:underline p-2", {
          "bg-purple-800  ": isActive,
        })
      }
      {...props}
    >
      {props.children}
    </ReactDomNavLink>
  );
};

export default NavLink;
