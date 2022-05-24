import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import Box from "../../components/Box/Box";
import Heading from "../../components/Heading/Heading";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../Modal";
import WalletCard from "./WalletCard";
import config, { walletLocalStorageKey } from "./config";
import { Config, Login } from "./types";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
}

const WalletWrapper = styled(Box)`
  max-height: 453px;
  overflow-y: auto;
  padding-bottom: 4px;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
`;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3 }) => {
  const sortedConfig = getPreferredConfig(config).filter((c) => c.title === "Metamask");
  return (
    <ModalContainer minWidth="340px">
      <ModalHeaderStyled>
        <ModalTitle>
          <Heading>Connect Wallet</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeaderStyled>
      <ModalBody width={["340px", null, "480px"]}>
        <WalletWrapper>
          {sortedConfig.map((wallet) => (
            <Box key={wallet.title}>
              <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
            </Box>
          ))}
        </WalletWrapper>
      </ModalBody>
    </ModalContainer>
  );
};
const ModalHeaderStyled = styled(ModalHeader)`
  padding: 23px 16px 22px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 30px 0;
  }
`;
export default ConnectModal;
