import { Flex } from '@my/ui';
import Page from 'components/Layout/Page';
import { chainId } from 'config/constants/tokens';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch } from 'state';
import { updateEndTime, updateIdoState } from 'state/ido';
import { useIdoData } from 'state/ido/hooks';
import { IIdoStateEnum } from 'state/ido/types';
import { IDOGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import Contribution from './components/Contribution';
import IdoBanner from './components/IdoBanner';
import InfoContribution from './components/InfoContribution';
import PositionAbsoult from './components/PositionAbsoult';
const Ido = () => {
  const {
    idoState,
    maxASTRBalance,
    endTime,
    avatEstimatedPrice,
    network,
    apr,
    amountInPool,
    rewards,
    lpTotalBalance,
    lpBalance,
  } = useIdoData();
  const { account } = useActiveWeb3React();
  const _key = useMemo(() => {
    return `${account}-${chainId}`;
  }, [account]);
  const _maxASTRBalance = useMemo(() => {
    return maxASTRBalance[_key] || '0.00';
  }, [maxASTRBalance, _key]);
  const _lpBalance = useMemo(() => {
    return lpBalance[_key] || '0.00';
  }, [lpBalance, _key]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateEndTime());
  }, [dispatch]);
  const changeIdoState = useCallback(
    (params: IIdoStateEnum) => {
      dispatch(
        updateIdoState({
          idoState: params,
        }),
      );
    },
    [dispatch],
  );
  return (
    <PageStyled>
      <PositionAbsoult changeIdoState={changeIdoState} />
      <IDOGlobalStyle />
      <IdoBanner />
      <FlexStyled>
        {/* 12s  300block */}
        <Contribution
          nextEventTime={12 * 300}
          lpTotalBalance={lpTotalBalance}
          lpBalance={_lpBalance}
          maxASTRBalance={_maxASTRBalance}
          idoState={idoState}
        />
        <InfoContribution
          idoState={idoState}
          endTime={endTime}
          avatEstimatedPrice={avatEstimatedPrice}
          network={network}
          apr={apr}
          amountInPool={amountInPool}
          rewards={rewards}
        />
      </FlexStyled>
    </PageStyled>
  );
};
const PageStyled = styled(Page)`
  padding: 0 0 130px;
`;
const FlexStyled = styled(Flex)`
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column-reverse;

  background-image: url('./images/stake/bg_element.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: right 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    background-position: right center;
    background-size: 420px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
  & > div {
    width: 100%;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 48%;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      width: 47%;
    }
  }
`;
export default Ido;
