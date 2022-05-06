import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Text, useMatchBreakpoints } from '@avault/ui';
import { useTranslation } from 'contexts/Localization';
import { getFullDisplayBalance } from 'utils/formatBalance';
import useToast from 'hooks/useToast';
import CInput from './C_Input';

import styled from 'styled-components';

interface WithdrawModalProps {
  displayEarningsBalance: string;
  max: BigNumber;
  lpSymbol: string;
  quoteTokenDecimals: number;
  onWithdraw: (amount: string) => void;
  onDismiss?: () => void;
}
const ModalInputStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 10px 16px 16px;
  margin-top: 8px;
`;
const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onWithdraw,
  onDismiss,
  max,
  displayEarningsBalance,
  lpSymbol,
  quoteTokenDecimals,
}) => {
  const [val, setVal] = useState('');
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const { t } = useTranslation();
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, quoteTokenDecimals, 2);
  }, [max, quoteTokenDecimals]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  const { isMd, isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isMd || isXl || isLg);
  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

  return (
    <Modal title="Withdraw" minWidth={isMobile ? '280px' : '520px'} bodyPadding="0 24px 34px" onDismiss={onDismiss}>
      <Text fontSize="12px" fontWeight="500" textAlign="right">
        LP Withdrawable: {displayEarningsBalance}
        {lpSymbol ? ` ${lpSymbol}` : ''}
      </Text>
      <ModalInputStyled>
        <CInput autoFocus={true} onSelectMax={handleSelectMax} onChange={handleChange} value={val} />
        <Button
          marginTop="8px"
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          height={isMobile ? '38px' : '48px'}
          onClick={async () => {
            setPendingTx(true);
            try {
              await onWithdraw(val);
              toastSuccess(t('Withdraw!'), t('Your earnings have also been withdrawed to your wallet'));
              onDismiss();
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              );
              console.error(e);
            } finally {
              setPendingTx(false);
            }
          }}
          width="100%"
        >
          {pendingTx ? t('Withdrawing') : t('Withdraw')}
        </Button>
      </ModalInputStyled>
    </Modal>
  );
};

export default WithdrawModal;
