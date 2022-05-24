import { Flex, useModal } from '@my/ui';
import Page from 'components/Layout/Page';
import { chainId } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { delay } from 'lodash';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'state';
import { ILockAVATModalState } from 'views/Governance/state/governance/types';
import styled from 'styled-components';
import LockAVATModal from './components/Modal/LockAVATModal';
import Rewards from './components/Rewards';
import Stake from './components/Stake';
import StakeingInfo from './components/StakeingInfo';
import { changeLockAVATModalState } from './state/governance';
import { useGovernanceData } from './state/governance/hooks';

const Governance = () => {
  const { account } = useActiveWeb3React();
  const { rewards, hasLocked, apy, avarageLockTime, totalAVATLocked, userData, isUserLoaded } = useGovernanceData();
  const _userData = useMemo(() => {
    const _userDataKey = `${account}-${chainId}`;
    return userData[_userDataKey];
  }, [userData, account]);
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
  // padding-top: 20px;
  background-image: url('./images/stake/bg_element.svg');
  background-size: 420px;
  background-repeat: no-repeat;
  background-position: 60px 30px;
  padding-bottom: 120px;
  // ${({ theme }) => theme.mediaQueries.sm} {
  //   padding-top: 60px;
  // }
  // ${({ theme }) => theme.mediaQueries.md} {
  //   padding-top: 100px;
  // }
`;
const PageWrapFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 0;
  }
  & > div {
    background-color: #181733;
    border: 1px solid #2e2d5b;
    box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    &:nth-child(1),
    &:nth-child(2) {
      width: 100%;
      height: 420px;
      margin-bottom: 20px;
      ${({ theme }) => theme.mediaQueries.sm} {
        height: 560px;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        margin-bottom: 0;
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
