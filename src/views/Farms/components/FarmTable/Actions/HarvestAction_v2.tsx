import React, { useState } from 'react';
import { Flex, useModal } from '@my/ui';
import BigNumber from 'bignumber.js';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard';
import { BIG_ZERO } from 'utils/bigNumber';
// import { usePriceCakeBusd } from 'state/farms/hooks';
import { useTranslation } from 'contexts/Localization';
import { ActionContent, ActionTitlesTitle, ActionTitlesBalance, LongButton } from './styles';
import styled from 'styled-components';
import ComingSoon from 'components/ComingSoon';
import { ActionContainer } from 'style/TableStyled';

interface HarvestActionProps extends FarmWithStakedValue {
  userDataReady: boolean;
  displayBalance: string | JSX.Element;
  earnings: BigNumber;
  lpSymbol: string;
}
const RewardsTitleStyled = styled(Flex)<{ disabled: boolean }>`
  display: ${({ disabled }) => (disabled ? 'none' : 'block')};
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`;
const FlexStyled = styled(Flex)`
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;
const ActionContentStyled = styled(ActionContent)<{ disabled: boolean }>`
  width: ${({ disabled }) => (disabled ? '100%' : '80px')};
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;
const HarvestAction: React.FunctionComponent<HarvestActionProps> = ({
  pid,
  earnings,
  displayBalance,
  userDataReady,
  lpSymbol,
}) => {
  const [pendingTx] = useState(false);
  const { t } = useTranslation();
  const disabled = earnings.eq(BIG_ZERO) || pendingTx || !userDataReady;

  const [onPresentComingSoon] = useModal(<ComingSoon />);
  return (
    <ActionContainer smallBorder={disabled ? false : true}>
      <FlexStyled>
        <RewardsTitleStyled disabled={disabled}>
          <ActionTitlesTitle>{lpSymbol === 'AVAT' ? 'AVAT-ASTR LP' : 'AVAT'} Rewards</ActionTitlesTitle>
          <ActionTitlesBalance balance={(earnings || BIG_ZERO).toNumber()}>{displayBalance}</ActionTitlesBalance>
        </RewardsTitleStyled>
        <ActionContentStyled disabled={disabled}>
          <LongButton
            // variant="secondary"
            onClick={() => {
              onPresentComingSoon();
            }}
            // disabled={disabled}
            // onClick={async () => {
            //   setPendingTx(true);
            //   try {
            //     await onReward();
            //     toastSuccess(
            //       `${t('Harvested')}!`,
            //       t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'KAC' }),
            //     );
            //   } catch (e) {
            //     toastError(
            //       t('Error'),
            //       t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
            //     );
            //     console.error(e);
            //   } finally {
            //     setPendingTx(false);
            //   }
            //   dispatch(fetchFarmUserDataAsync({ account, pids: [pid] }));
            // }}
          >
            {!disabled ? 'Claim' : t('Harvest')}
          </LongButton>
        </ActionContentStyled>
      </FlexStyled>
    </ActionContainer>
  );
};

export default HarvestAction;
