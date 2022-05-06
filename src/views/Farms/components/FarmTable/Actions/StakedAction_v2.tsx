import React from 'react';
import styled from 'styled-components';
import { useModal, Text } from '@my/ui';
import { useLocation } from 'react-router-dom';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard';
import { LongButton } from './styles';
import ComingSoon from 'components/ComingSoon';
import { ActionContainer } from 'style/TableStyled';

const TextTop = styled.div`
  display: none;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`;

interface StackedActionProps {
  farm: FarmWithStakedValue;
  userDataReady: boolean;
}

const Staked: React.FunctionComponent<StackedActionProps> = ({ farm, userDataReady }) => {
  const { lpSymbol } = farm;
  const location = useLocation();

  // if (isApproved && stakedBalance.gt(0)) {
  //   return (
  //     <ActionContainer smallBorder={true}>
  //       <FlexStyled>
  //         <div>
  //           <Text bold color="text" fontSize="12px" lineHeight="27px">
  //             {lpSymbol} Staked
  //           </Text>
  //           <Text marginTop="4px" color="primary" bold fontSize="18px" lineHeight="22px">
  //             {displayBalance()}
  //           </Text>
  //         </div>
  //         <IconButtonWrapper>
  //           <MinusBtnIcon cursor="pointer" width="36px" onClick={onPresentWithdraw} mr="8px" />
  //           <AddBtnIcon
  //             onClick={() => {
  //               if (['history', 'archived'].some((item) => location.pathname.includes(item))) {
  //                 return null;
  //               }
  //               onPresentDeposit();
  //             }}
  //             opacity={['history', 'archived'].some((item) => location.pathname.includes(item)) ? '0.8' : '1'}
  //             width="36px"
  //           />
  //         </IconButtonWrapper>
  //       </FlexStyled>
  //     </ActionContainer>
  //   );
  // }

  // if (!isApproved) {
  //   return (
  //     <ActionContainer smallBorder={false}>
  //       <TextTop>
  //         <Text bold color="text" fontSize="12px" lineHeight="27px">
  //           Approve {lpSymbol === 'AVAT' ? 'aAVAT' : 'AVAT'}
  //         </Text>
  //       </TextTop>
  //       <LongButton disabled={requestedApproval} onClick={handleApprove} variant="secondary">
  //         Approve
  //       </LongButton>
  //     </ActionContainer>
  //   );
  // }
  const [onPresentComingSoon] = useModal(<ComingSoon />);
  return (
    <ActionContainer smallBorder={false}>
      <TextTop>
        <Text bold color="text" fontSize="12px" lineHeight="27px">
          Stake {lpSymbol}
        </Text>
      </TextTop>
      <LongButton
        variant="secondary"
        onClick={() => onPresentComingSoon()}
        // onClick={() => {
        //   if (account) {
        //     onPresentDeposit();
        //   } else {
        //     const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;
        //     if (connectorId) {
        //       login(connectorId);
        //     }
        //   }
        // }}
        disabled={['history', 'archived'].some((item) => location.pathname.includes(item))}
      >
        Stake
      </LongButton>
    </ActionContainer>
  );
};

export default Staked;
