import React from "react"

const Wrapper = (props: {
  children: React.ReactNode;
}) => {
  return (
    <div>{props.children}</div>
  )
}

export default Wrapper;