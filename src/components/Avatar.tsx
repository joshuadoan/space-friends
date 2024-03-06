import React from "react";

const Avatar = (props: { url: string }) => {
  return <img src={props.url} className="m-1" />;
};

export default Avatar;
