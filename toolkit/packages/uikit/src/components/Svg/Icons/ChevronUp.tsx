import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 20 20" {...props}>
      <g fill="none" fillRule="evenodd">
        <path fill="#201F43" d="M10 0A10 10 0 1 0 10 20A10 10 0 1 0 10 0Z" />
        <path
          d="M10.7071068,6.70710678 L14.2928932,10.2928932 C14.6834175,10.6834175 14.6834175,11.3165825 14.2928932,11.7071068 C14.1053568,11.8946432 13.8510029,12 13.5857864,12 L6.41421356,12 C5.86192881,12 5.41421356,11.5522847 5.41421356,11 C5.41421356,10.7347835 5.5195704,10.4804296 5.70710678,10.2928932 L9.29289322,6.70710678 C9.68341751,6.31658249 10.3165825,6.31658249 10.7071068,6.70710678 Z"
          fill="#1476FF"
        />
      </g>
    </Svg>
  );
};

export default Icon;
