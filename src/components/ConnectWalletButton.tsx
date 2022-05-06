import React from 'react';
import { Button, useWalletModal } from '@avault/ui';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
const ButtonStyled = styled(Button)`
  border: none;
  height: 36px;
  width: 150px;
  background-image: linear-gradient(90deg, #8c1ab5 0%, #17b38d 100%);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text};
`;
const ConnectWalletButton = (props) => {
  const { t } = useTranslation();
  const { login, logout } = useAuth();
  const { onPresentConnectModal } = useWalletModal(login, logout);

  return (
    <ButtonStyled variant="tertiary" onClick={onPresentConnectModal} width="140px" padding="0" {...props}>
      {t('Connect Wallet')}
    </ButtonStyled>
  );
};

export default ConnectWalletButton;
