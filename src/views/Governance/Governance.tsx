import { Flex, useModal } from '@my/ui';
import Page from 'components/Layout/Page';
import { chainId } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { delay } from 'lodash';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { changeLockAVATModalState } from 'state/governance';
import { useGovernanceData } from 'state/governance/hooks';
import { ILockAVATModalState } from 'state/governance/types';
import styled from 'styled-components';
import LockAVATModal from './components/Modal/LockAVATModal';
import Rewards from './components/Rewards';
import Stake from './components/Stake';
import StakeingInfo from './components/StakeingInfo';

const Governance = () => {
  const { account } = useActiveWeb3React();
  const { rewards, hasLocked, apy, avarageLockTime, totalAVATLocked, userData, isUserLoaded } = useGovernanceData();
  const _userDataKey = `${account}-${chainId}`;
  const _userData = userData[_userDataKey];
  const { AVATBalance = '0' } = _userData || {};
  const dispatch = useDispatch<AppDispatch>();

  const [onPresentLockAVATModal] = useModal(
    <LockAVATModal account={account} max={AVATBalance} isUserLoaded={isUserLoaded} />,
  );
  const onClickModal = useCallback(
    (state: ILockAVATModalState) => {
      dispatch(changeLockAVATModalState({ lockAVATModalState: state }));
      delay(onPresentLockAVATModal, 100);
    },
    [onPresentLockAVATModal, dispatch],
  );
  return (
    <PageStyled>
      <PageWrapFlex>
        <StakeingInfo apy={apy} totalAVATLocked={totalAVATLocked} avarageLockTime={avarageLockTime} />
        <Stake hasLocked={hasLocked} userData={_userData} account={account} onClickModal={onClickModal} />
        <Rewards rewards={rewards} />
      </PageWrapFlex>
    </PageStyled>
  );
};
const PageStyled = styled(Page)`
  padding-top: 20px;
  background-image: url('./images/stake/bg_element.svg');
  background-size: 420px;
  background-repeat: no-repeat;
  background-position: 60px 45px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 50;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 100px;
  }
`;
const PageWrapFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  & > div {
    background-color: #181733;
    border: 1px solid #2e2d5b;
    box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    &:nth-child(1),
    &:nth-child(2) {
      width: 100%;
      height: 460px;
      margin-bottom: 20px;
      ${({ theme }) => theme.mediaQueries.sm} {
        height: 560px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        margin-top: 0;
        width: 49%;
        max-width: 585px;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        height: 638px;
      }
    }
    // &:nth-child(2) {
    //   margin-left: 2%;
    // }
    &:nth-child(3) {
      width: 100%;
      margin-bottom: 20px;
      border: none;
      background-color: transparent;
      ${({ theme }) => theme.mediaQueries.md} {
        background-color: #181733;
        border: 1px solid #2e2d5b;
        margin-top: 40px;
        margin-bottom: 0;
      }
    }
  }
`;
export default Governance;
