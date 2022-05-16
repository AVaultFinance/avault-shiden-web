// import getTimePeriods from 'utils/getTimePeriods';
import { Button, Flex } from '@my/ui';
import { useMemo } from 'react';
import { IGovernanceUserData } from 'state/governance/types';
import styled from 'styled-components';
import StakeBalance from './StakeComponents/Balance';
import Countdown from './StakeComponents/Countdown/Countdown';
interface IProps {
  hasLocked: boolean;
  userData: IGovernanceUserData;
  account: string;
  onPresentLockAVATModal: any;
}
const Stake = ({ hasLocked, userData, account, onPresentLockAVATModal }: IProps) => {
  return useMemo(() => {
    const {
      xAVATBalance = '0',
      AVATLocked = '0',
      withdrawalDate = '0',
      remainderBlock = 1,
      AVATBalance,
    } = userData || {};
    return (
      <div>
        <StakeStyled hasLocked={hasLocked}>
          <StakeBalance
            AVATBalance={AVATBalance}
            xAVATBalance={xAVATBalance}
            AVATLocked={AVATLocked}
            withdrawalDate={withdrawalDate}
            remainderBlock={remainderBlock}
          />
          {/* 12s  300block */}
          <Countdown nextEventTime={12 * remainderBlock} hasLocked={hasLocked} />
          {hasLocked ? (
            <FlexButton>
              <Button>Lock more</Button>
              <Button variant="tertiary">Withdraw</Button>
            </FlexButton>
          ) : (
            <LongButton onClick={onPresentLockAVATModal}>Create Lock</LongButton>
          )}
        </StakeStyled>
      </div>
    );
  }, [hasLocked, userData, onPresentLockAVATModal]);
};
const StakeStyled = styled.div<{ hasLocked: boolean }>`
  position: relative;
  padding: 8% 5%;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ hasLocked }) => (hasLocked ? '6' : '9')}% 5% 8%;
  }
`;
const LongButton = styled(Button)`
  width: 90%;
  border-radius: 12px;
  font-size: 18px;
  height: 60px;
  position: absolute;
  bottom: 6%;
  left: 5%;
`;
const FlexButton = styled(Flex)`
  width: 90%;
  position: absolute;
  bottom: 5%;
  left: 5%;
  align-items: center;
  justify-content: space-between;
  button {
    border-radius: 12px;
    font-size: 15px;
    height: 48px;
    width: 48%;
    &:last-child {
      background-color: transparent;
    }
  }
`;
export default Stake;
