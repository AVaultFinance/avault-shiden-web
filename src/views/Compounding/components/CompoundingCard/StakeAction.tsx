import React, { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Button, Flex, Heading, IconButton, useModal } from '@avault/ui';
import { useLocation } from 'react-router-dom';
import Balance from 'components/Balance';
import { useTranslation } from 'contexts/Localization';
import { useAppDispatch } from 'state';
import { fetchFarmUserDataAsync } from 'state/farms';
import { useLpTokenPrice } from 'state/farms/hooks';
import { getBalanceAmount, getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance';
import MinusIconPrimary from 'components/svg/minusIconPrimary';
import AddIconPrimary from 'components/svg/addIconPrimary';
import { ICompounding } from 'state/compounding/types';
import useCompoundingDeposit from 'views/Compounding/hooks/useCompoundingDeposit';
import { chainId } from 'config/constants/tokens';
import useCompoundingWithdraw from 'views/Compounding/hooks/useCompoundingWithdraw';
import { useCompounding } from 'state/compounding/hooks';
import { fetchCompoundingFarmUserDataAsync } from 'state/compounding';
import DepositModal from '../CompoundingTable/Actions/DepositModal';
import WithdrawModal from '../CompoundingTable/Actions/WithdrawModal';

interface CompoundingCardActionsProps {
  stakedBalance?: BigNumber;
  stakingTokenBalance?: BigNumber;
  tokenName?: string;
  pid?: number;
  addLiquidityUrl?: string;
  compounding: ICompounding;
  lpSymbol: string;
  lpToCLpRate: string;
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`;

const StakeAction: React.FC<CompoundingCardActionsProps> = ({
  stakedBalance,
  stakingTokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
  compounding,
  lpSymbol,
  lpToCLpRate,
}) => {
  const { t } = useTranslation();

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { account } = useWeb3React();
  const { data: compoundings } = useCompounding();
  const { onDeposit } = useCompoundingDeposit(
    account,
    compounding.contractAddress[chainId],
    compounding.farm.quoteTokenDecimals,
  );
  const { onWithdraw } = useCompoundingWithdraw(
    account,
    compounding.contractAddress[chainId],
    compounding.farm.quoteTokenDecimals,
  );
  const lpPrice = useLpTokenPrice(tokenName);
  console.log('stakingTokenBalance: ', stakingTokenBalance);
  const handleDeposit = async (amount: string) => {
    await onDeposit(amount);
    dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
  };

  const handleWithdraw = async (amount: string) => {
    const _amount = new BigNumber(amount).times(1 / Number(lpToCLpRate));
    await onWithdraw(_amount.toString());
    dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
  };

  const displayBalance = useCallback(() => {
    const stakedBalanceBigNumber = getBalanceAmount(stakedBalance);
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0000001)) {
      return stakedBalanceBigNumber.toFixed(10, BigNumber.ROUND_DOWN);
    }
    if (stakedBalanceBigNumber.gt(0) && stakedBalanceBigNumber.lt(0.0001)) {
      return getFullDisplayBalance(stakedBalance).toLocaleString();
    }
    return stakedBalanceBigNumber.toFixed(3, BigNumber.ROUND_DOWN);
  }, [stakedBalance]);

  const [onPresentDeposit] = useModal(
    <DepositModal
      quoteTokenDecimals={compounding.farm.quoteTokenDecimals}
      lpSymbol={lpSymbol}
      max={stakingTokenBalance}
      displayBalance={displayBalance()}
      onDeposit={handleDeposit}
    />,
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      quoteTokenDecimals={compounding.farm.quoteTokenDecimals}
      lpSymbol={lpSymbol}
      displayEarningsBalance={displayBalance()}
      max={stakedBalance}
      onWithdraw={handleWithdraw}
    />,
  );

  const renderStakingButtons = () => {
    return stakedBalance.eq(0) ? (
      <Button
        onClick={onPresentDeposit}
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
      >
        {t('Stake LP')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIconPrimary />
        </IconButton>
        <IconButton
          variant="tertiary"
          onClick={onPresentDeposit}
          disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
        >
          <AddIconPrimary />
        </IconButton>
      </IconButtonWrapper>
    );
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading color={stakedBalance.eq(0) ? 'textDisabled' : 'text'}>{displayBalance()}</Heading>
        {stakedBalance.gt(0) && lpPrice.gt(0) && (
          <Balance
            fontSize="12px"
            color="textSubtle"
            decimals={2}
            value={getBalanceNumber(lpPrice.times(stakedBalance))}
            unit=" USD"
            prefix="~"
          />
        )}
      </Flex>
      {renderStakingButtons()}
    </Flex>
  );
};

export default StakeAction;
