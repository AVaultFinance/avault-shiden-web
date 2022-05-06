import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Button, Flex, Text } from '@avault/ui';
import { getAddress } from 'utils/addressHelpers';
import { useAppDispatch } from 'state';
import { fetchFarmUserDataAsync } from 'state/farms';
import { useTranslation } from 'contexts/Localization';
import { useERC20 } from 'hooks/useContract';
import ConnectWalletButton from 'components/ConnectWalletButton';
import StakeAction from './StakeAction';
import HarvestAction from './HarvestAction';
import useApproveFarm from '../../hooks/useApproveFarm';
import { ICompounding } from 'state/compounding/types';
import { fetchCompoundingFarmUserDataAsync } from 'state/compounding';
import { useCompounding } from 'state/compounding/hooks';

const Action = styled.div`
  padding-top: 16px;
`;

interface CompoundingCardActionsProps {
  compounding: ICompounding;
  account?: string;
  addLiquidityUrl?: string;
  lpSymbol: string;
  lpToCLpRate: string;
}

const CardActions: React.FC<CompoundingCardActionsProps> = ({
  compounding,
  account,
  addLiquidityUrl,
  lpSymbol,
  lpToCLpRate,
}) => {
  const { t } = useTranslation();
  const [requestedApproval, setRequestedApproval] = useState(false);
  const {
    farm: { pid, lpAddresses, userData },
  } = compounding;
  const {
    allowance: allowanceAsString = '0',
    stakingTokenBalance: tokenBalanceAsString = '0',
    stakedBalance: stakedBalanceAsString = '0',
    pendingReward: earningsAsString = '0',
  } = userData || {};
  const allowance = new BigNumber(allowanceAsString);
  const stakingTokenBalance = new BigNumber(tokenBalanceAsString);
  const stakedBalance = new BigNumber(stakedBalanceAsString);
  const earnings = new BigNumber(earningsAsString);
  const lpAddress = getAddress(lpAddresses);
  const isApproved = account && allowance && allowance.isGreaterThan(0);
  const dispatch = useAppDispatch();

  const lpContract = useERC20(lpAddress);
  const { data: compoundings } = useCompounding();

  const { onApprove } = useApproveFarm(lpContract);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove, dispatch, account, pid]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        stakedBalance={stakedBalance}
        stakingTokenBalance={stakingTokenBalance}
        tokenName={compounding.compounding.name}
        pid={pid}
        addLiquidityUrl={addLiquidityUrl}
        compounding={compounding}
        lpSymbol={lpSymbol}
        lpToCLpRate={lpToCLpRate}
      />
    ) : (
      <Button mt="8px" width="100%" disabled={requestedApproval} onClick={handleApprove}>
        {t('Enable Contract')}
      </Button>
    );
  };

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="text" fontSize="12px" pr="4px">
          KACO
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Earned')}
        </Text>
      </Flex>
      <HarvestAction lpSymbol={lpSymbol} earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="text" fontSize="12px" pr="4px">
          {compounding.compounding.name}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {t('Staked')}
        </Text>
      </Flex>
      {!account ? <ConnectWalletButton mt="8px" width="100%" /> : renderApprovalOrStakeButton()}
    </Action>
  );
};

export default CardActions;
