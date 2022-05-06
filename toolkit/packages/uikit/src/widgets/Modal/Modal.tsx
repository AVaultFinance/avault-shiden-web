import React from "react";
import { useTheme } from "styled-components";
import Heading from "../../components/Heading/Heading";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from "./styles";
import { ModalProps } from "./types";

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  headerPadding,
  bodyPadding,
  headerBackground = "transparent",
  minWidth = "343px",
  maxWidth = "100%",
  ...props
}) => {
  const theme = useTheme();
  return (
    <ModalContainer minWidth={minWidth} maxWidth={maxWidth} {...props}>
      <ModalHeader
        headerPadding={headerPadding}
        background={getThemeValue(`colors.${headerBackground}`, headerBackground)(theme)}
      >
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          <Heading>{title}</Heading>
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody bodyPadding={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  );
};

export default Modal;
