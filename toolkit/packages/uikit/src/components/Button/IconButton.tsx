import styled from "styled-components";
import Button from "./Button";
import { BaseButtonProps, PolymorphicComponent } from "./types";

const IconButton: PolymorphicComponent<BaseButtonProps, "button"> = styled(Button)<BaseButtonProps>`
  padding: 0;
  svg {
    fill: ${({ theme }) => theme.colors.textSubtle};
    path {
      fill: ${({ theme }) => theme.colors.textSubtle};
    }
  }
  &:hover {
    opacity: 1 !important;
    svg {
      fill: ${({ theme }) => theme.colors.text};
      path {
        fill: ${({ theme }) => theme.colors.text};
      }
    }
  }
`;

export default IconButton;
