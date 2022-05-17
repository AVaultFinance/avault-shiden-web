import { Flex, useMatchBreakpoints } from '@my/ui';
import Page from 'components/Layout/Page';
import { useIdoData } from 'state/ido/hooks';
import { IDOGlobalStyle } from 'style/Global';
import styled from 'styled-components';
import Contribution from './components/Contribution';
import IdoBanner from './components/IdoBanner';
import InfoContribution from './components/InfoContribution';
const Ido = () => {
  const { isXl, isLg } = useMatchBreakpoints();
  const isMobile = !(isXl || isLg);
  const { idoState, maxASTRBalance } = useIdoData();
  return (
    <PageStyled>
      <IDOGlobalStyle />
      <IdoBanner isMobile={isMobile} />
      <FlexStyled>
        {/* 12s  300block */}
        <Contribution nextEventTime={12 * 300} maxASTRBalance={maxASTRBalance} idoState={idoState} />
        <InfoContribution idoState={idoState} />
      </FlexStyled>
    </PageStyled>
  );
};
const PageStyled = styled(Page)`
  padding: 0 0 130px;
`;
const FlexStyled = styled(Flex)`
  padding: 0 5%;
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: column-reverse;

  background-image: url('./images/stake/bg_element.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: right center;
  ${({ theme }) => theme.mediaQueries.md} {
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
      width: 45%;
    }
  }
`;
export default Ido;
