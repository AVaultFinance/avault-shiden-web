import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Text } from '@avault/ui';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { BIG_ZERO } from 'utils/bigNumber';
import { useAppDispatch } from 'state';
import { fetchFarmUserDataAsync } from 'state/farms';
import useToast from 'hooks/useToast';
import { useTranslation } from 'contexts/Localization';
import { ActionContainer, LongButton } from './styles';
import styled from 'styled-components';
import CInput from './C_Input';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { useCompounding } from 'state/compounding/hooks';
import useCompoundingWithdraw from 'views/Compounding/hooks/useCompoundingWithdraw';
import { fetchCompoundingFarmUserDataAsync } from 'state/compounding';

interface WithdrawActionProps {
  userDataReady: boolean;
  displayBalance: string | JSX.Element;
  earnings: BigNumber;
  isApproved: boolean;
  handleApprove: any;
  requestedApproval: boolean;
  pid: number;
  name: string;
  displayEarningsBalance?: string;
  lpSymbol: string;
  contractAddress: string;
  quoteTokenDecimals: number;
  lpToCLpRate: string;
}
const FlexStyled = styled(Flex)`
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const WithdrawAction: React.FunctionComponent<WithdrawActionProps> = ({
  pid,
  earnings,
  userDataReady,
  name,
  isApproved,
  handleApprove,
  requestedApproval,
  displayEarningsBalance,
  lpSymbol,
  contractAddress,
  quoteTokenDecimals,
  lpToCLpRate,
}) => {
  const { data: compoundings } = useCompounding();
  const { toastSuccess, toastError } = useToast();

  const [pendingTx, setPendingTx] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { onWithdraw } = useCompoundingWithdraw(account, contractAddress, quoteTokenDecimals);
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(earnings, quoteTokenDecimals, 4);
  }, [earnings, quoteTokenDecimals]);
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

  const valNumber = new BigNumber(val);
  const fullBalanceNumber = new BigNumber(fullBalance);
  const disabled =
    requestedApproval ||
    earnings.eq(BIG_ZERO) ||
    pendingTx ||
    !userDataReady ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber);

  return (
    <div>
      <Text textAlign="right" fontSize="12px" marginBottom="8px" fontWeight="500">
        LP Withdrawable: {displayEarningsBalance}
        {/* {lpSymbol ? ` ${lpSymbol}` : ''} */}
      </Text>
      <ActionContainer smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          <LongButton
            variant="primary"
            disabled={disabled}
            onClick={async () => {
              setPendingTx(true);
              try {
                const _amount = new BigNumber(val).times(1 / Number(lpToCLpRate)).toString();
                await onWithdraw(_amount);
                dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
                toastSuccess(
                  `Withdraw!`,
                  t('Your %symbol% earnings have been sent to your wallet!', { symbol: lpSymbol }),
                );
                setVal('');
              } catch (e) {
                toastError(
                  t('Error'),
                  t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                );
                console.error(e);
              } finally {
                setPendingTx(false);
              }
              dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
            }}
          >
            {pendingTx ? 'Withdrawing' : 'Withdraw'}
          </LongButton>
        </FlexStyled>
      </ActionContainer>
    </div>
  );
};

export default WithdrawAction;
