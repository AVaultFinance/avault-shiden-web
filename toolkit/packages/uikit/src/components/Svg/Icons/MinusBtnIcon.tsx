import React from "react";
import Svg from "../Svg";
import { useTheme } from "styled-components";
import { SvgProps } from "../types";

const MinusBtnIcon: React.FC<SvgProps> = (props) => {
  const theme = useTheme();
  return (
    <Svg viewBox="0 0 32 32" {...props}>
      <g fill="none" fillRule="evenodd">
        <rect stroke={theme.colors.primary} x=".5" y=".5" width="31" height="31" rx="12" />
        <rect fill={theme.colors.primary} x="8" y="14" width="16" height="4" rx="2" />
      </g>
    </Svg>
  );
};

export default MinusBtnIcon;
