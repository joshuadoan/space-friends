import React from "react";


export const Slider = (props: {
  disabled?: boolean;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) => <div className="flex flex-col items-center gap-2 ">
    <input
      disabled={props.disabled}
      type="range"
      min={props.min * 10}
      max={props.max * 10}
      title={props.value.toString()}
      value={props.value * 10}
      className=" bg-purple-600 disabled:opacity-70"
      onChange={(e) => props.onChange(Number(e.target.value) / 10)} />
    <div className="w-full flex justify-between text-xs px-2">
      <span>|</span>
      <span>z</span>
      <span>|</span>
      <span>o</span>
      <span>|</span>
      <span>o</span>
      <span>|</span>
      <span>m</span>
      <span>|</span>
    </div>
  </div>;
