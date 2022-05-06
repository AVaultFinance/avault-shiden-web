import styled, { DefaultTheme } from "styled-components";
import { space, layout, variant } from "styled-system";
import { scaleVariants, scaleVariants_MD, styleVariants } from "./theme";
import { BaseButtonProps } from "./types";

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  isLoading?: boolean;
}

const getDisabledStyles = ({ isLoading, theme, variant: v }: TransientButtonProps) => {
  if (isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        color: ${theme.colors.primary};
        background-color: ${theme.colors.btnBgSecondaryColor};
        border-color: ${theme.colors.btnBgSecondaryColor};
        box-shadow: none;
        cursor: not-allowed;
      }
    `;
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: ${theme.colors.btnBgSecondaryColor};
      border-color: ${theme.colors.btnBgSecondaryColor};
      color: #37365E;
      box-shadow: none;
      cursor: not-allowed;
    }
  `;
};
// background-color: ${v === "primary" ?  ${theme.colors.btnBgSecondaryColor}" : "#030222"};
// border-color: ${v === "primary" ?  ${theme.colors.btnBgSecondaryColor}" : "#030222"};
// color: ${v === "primary" ? "#37365E" : "#484E4E"};
/*** This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ isLoading = false }: TransientButtonProps) => {
  return isLoading ? ".5" : "1";
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1;
  opacity: ${getOpacity};
  outline: 0;
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    opacity: 0.65;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}

  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}

  ${variant({
    prop: "scale",
    variants: scaleVariants_MD,
  })}
  ${({ theme }) => theme.mediaQueries.md} {
    ${variant({
      prop: "scale",
      variants: scaleVariants,
    })}
  }

  &.loading {
    color: ${({ theme }) => theme.colors.primary};
    opacity: 1;
    svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

export default StyledButton;
