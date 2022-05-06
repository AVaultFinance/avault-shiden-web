import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Modal, Text, useMatchBreakpoints } from '@avault/ui';
import { useTranslation } from 'contexts/Localization';
import { getFullDisplayBalance } from 'utils/formatBalance';
import useToast from 'hooks/useToast';
import CInput from './C_Input';
import styled from 'styled-components';

interface DepositModalProps {
  lpSymbol?: string;
  max: BigNumber;
  displayBalance: string;
  quoteTokenDecimals: number;
  onDeposit: (amount: string) => void;
  onDismiss?: () => void;
}
const ModalInputStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 12px 16px 16px;
  margin-top: 8px;
`;
const DepositModal: React.FC<DepositModalProps> = ({
  lpSymbol,
  quoteTokenDecimals,
  max,
  onDeposit,
  onDismiss,
  displayBalance,
}) => {
  const [val, setVal] = useState('');
  const { toastSuccess, toastError } = useToast();
  const [pendingTx, setPendingTx] = useState(false);
  const { t } = useTranslation();
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, quoteTokenDecimals, 2);
  }, [max, quoteTokenDecimals]);

  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);

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

  return (
    <Modal title={'Deposit'} minWidth={isMobile ? '280px' : '520px'} bodyPadding="0 24px 34px" onDismiss={onDismiss}>
      <Text fontSize="12px" fontWeight="500" textAlign="right">
        {/* {lpSymbol ?? ''} */}
        LP Balance: {displayBalance}
      </Text>
      <ModalInputStyled>
        <CInput value={val} autoFocus={true} onSelectMax={handleSelectMax} onChange={handleChange} />
        <Button
          marginTop="8px"
          width="100%"
          height={isMobile ? '38px' : '48px'}
          disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
          onClick={async () => {
            setPendingTx(true);
            try {
              await onDeposit(val);
              toastSuccess(t('Deposit!'), t('Your funds have been deposited in the compounding'));
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
        >
          {pendingTx ? 'Depositing' : 'Deposit'}
        </Button>
      </ModalInputStyled>
    </Modal>
  );
};

export default DepositModal;
