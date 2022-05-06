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
import { useCompounding, useCompoundingFarmUser } from 'state/compounding/hooks';
import useCompoundingDeposit from 'views/Compounding/hooks/useCompoundingDeposit';
import { fetchCompoundingFarmUserDataAsync } from 'state/compounding';

interface HarvestActionProps {
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
}
const FlexStyled = styled(Flex)`
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  pid,
  earnings,
  userDataReady,
  isApproved,
  handleApprove,
  requestedApproval,
  lpSymbol,
  displayBalance,
  contractAddress,
  quoteTokenDecimals,
}) => {
  const { toastSuccess, toastError } = useToast();
  const { data: compoundings } = useCompounding();

  const [pendingTx, setPendingTx] = useState(false);
  const { account } = useWeb3React();
  const { onDeposit } = useCompoundingDeposit(account, contractAddress, quoteTokenDecimals);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [val, setVal] = useState('');
  const { stakingTokenBalance } = useCompoundingFarmUser(pid ?? 0);
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakingTokenBalance, quoteTokenDecimals, 6);
  }, [stakingTokenBalance, quoteTokenDecimals]);
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
  const valNumber = new BigNumber(val);
  const disabled =
    requestedApproval ||
    stakingTokenBalance.eq(BIG_ZERO) ||
    pendingTx ||
    !userDataReady ||
    !valNumber.isFinite() ||
    valNumber.eq(0) ||
    valNumber.gt(fullBalanceNumber);

  return (
    <div>
      <Text textAlign="right" fontSize="12px" marginBottom="8px" fontWeight="500">
        {/* {lpSymbol ?? ''} */}
        LP Balance: {displayBalance}
      </Text>
      <ActionContainer smallBorder={disabled ? false : true}>
        <FlexStyled>
          <CInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
          {!isApproved ? (
            <LongButton disabled={requestedApproval} onClick={handleApprove} variant="secondary">
              Approve
            </LongButton>
          ) : (
            <LongButton
              variant="primary"
              disabled={disabled}
              onClick={async () => {
                setPendingTx(true);
                try {
                  await onDeposit(val);
                  dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
                  toastSuccess(`Deposit!`, t('Your %symbol% deposit!', { symbol: lpSymbol }));
                } catch (e) {
                  toastError(
                    t('Error'),
                    t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
                  );
                  setVal('');
                  console.error(e);
                } finally {
                  setPendingTx(false);
                }
                dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
              }}
            >
              {pendingTx ? 'Depositing' : 'Deposit'}
            </LongButton>
          )}
        </FlexStyled>
      </ActionContainer>
    </div>
  );
};

export default HarvestAction;
