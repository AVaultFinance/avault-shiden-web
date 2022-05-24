// import getTimePeriods from 'utils/getTimePeriods';
import { Button, Flex } from '@my/ui';
import ConnectWalletButton from 'components/ConnectWalletButton';
import { useMemo } from 'react';
import { IGovernanceUserData, ILockAVATModalState } from 'views/Governance/state/governance/types';
import styled from 'styled-components';
import Countdown from './StakeComponents/Countdown';
import StakeBalance from './StakeComponents/Balance';
interface IProps {
  hasLocked: boolean;
  userData: IGovernanceUserData;
  account: string;
  onClickModal: any;
}
const Stake = ({ hasLocked, userData, account, onClickModal }: IProps) => {
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
          <Countdown nextEventTime={12 * remainderBlock} hasLocked={hasLocked} onClickModal={onClickModal} />
          {hasLocked ? (
            <FlexButton>
              <Button
                onClick={() => {
                  onClickModal(ILockAVATModalState.ADDAMOUNT);
                }}
              >
                Lock more
              </Button>
              <Button
                variant="tertiary"
                onClick={() => {
                  onClickModal(ILockAVATModalState.WITHDRAW);
                }}
              >
                Withdraw
              </Button>
            </FlexButton>
          ) : account ? (
            <LongButton
              onClick={() => {
                onClickModal(ILockAVATModalState.INIT);
              }}
            >
              Create Lock
            </LongButton>
          ) : (
            <ConnectWalletButtonStyle />
          )}
        </StakeStyled>
      </div>
    );
  }, [hasLocked, userData, onClickModal, account]);
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
const ConnectWalletButtonStyle = styled(ConnectWalletButton)`
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
