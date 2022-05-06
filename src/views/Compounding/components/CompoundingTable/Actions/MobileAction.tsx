import { Button, Flex, useModal } from '@avault/ui';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useAppDispatch } from 'state';
import { fetchCompoundingFarmUserDataAsync } from 'state/compounding';
import { useCompounding } from 'state/compounding/hooks';
import styled from 'styled-components';
import useCompoundingDeposit from 'views/Compounding/hooks/useCompoundingDeposit';
import useCompoundingWithdraw from 'views/Compounding/hooks/useCompoundingWithdraw';
import DepositModal from './DepositModal';
import { LongButton } from './styles';
import WithdrawModal from './WithdrawModal';

interface MobileActionProps {
  userDataReady: boolean;
  displayBalance: string;
  earnings: BigNumber;
  isApproved: boolean;
  handleApprove: any;
  requestedApproval: boolean;
  account: string;
  pid: number;
  lpSymbol?: string;
  stakingTokenBalance?: BigNumber;
  displayEarningsBalance?: string;
  contractAddress: string;
  quoteTokenDecimals: number;
  lpToCLpRate: string;
}
const Container = styled(Flex)`
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const ButtonStyled = styled(Button)`
  width: 45%;
  height: 36px;
`;
const MobileAction: FC<MobileActionProps> = ({
  userDataReady,
  isApproved,
  handleApprove,
  earnings,
  requestedApproval,
  pid,
  account,
  displayBalance,
  lpSymbol,
  stakingTokenBalance,
  displayEarningsBalance,
  contractAddress,
  quoteTokenDecimals,
  lpToCLpRate,
}) => {
  const { data: compoundings } = useCompounding();
  const { onDeposit } = useCompoundingDeposit(account, contractAddress, quoteTokenDecimals);
  const { onWithdraw } = useCompoundingWithdraw(account, contractAddress, quoteTokenDecimals);
  const dispatch = useAppDispatch();
  const handleDeposit = async (amount: string) => {
    await onDeposit(amount);
    dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
  };

  const handleWithdraw = async (amount: string) => {
    const _amount = new BigNumber(amount).times(1 / Number(lpToCLpRate));
    await onWithdraw(_amount.toString());
    dispatch(fetchCompoundingFarmUserDataAsync({ account, compoundings }));
  };
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      lpSymbol={lpSymbol}
      displayBalance={displayBalance}
      onDeposit={handleDeposit}
      quoteTokenDecimals={quoteTokenDecimals}
    />,
  );
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={earnings}
      lpSymbol={lpSymbol}
      displayEarningsBalance={displayEarningsBalance}
      quoteTokenDecimals={quoteTokenDecimals}
      onWithdraw={handleWithdraw}
    />,
  );

  return (
    <Container>
      {isApproved ? (
        <>
          <ButtonStyled onClick={onPresentDeposit}>Deposit</ButtonStyled>
          <ButtonStyled variant="tertiary" onClick={onPresentWithdraw}>
            Withdraw
          </ButtonStyled>
        </>
      ) : (
        <LongButton disabled={requestedApproval} onClick={handleApprove} variant="secondary">
          Approve
        </LongButton>
      )}
    </Container>
  );
};
export default MobileAction;
