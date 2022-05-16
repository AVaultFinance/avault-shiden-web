import { Flex } from '@my/ui';
import Page from 'components/Layout/Page';
import styled from 'styled-components';
import Rewards from './components/Rewards';
import StakeComponents from './components/StakeComponents';
import StakeingInfo from './components/StakeingInfo';

const Governance = () => {
  return (
    <PageStyled>
      <PageWrapFlex>
        <StakeingInfo />
        <StakeComponents />
        <Rewards />
      </PageWrapFlex>
    </PageStyled>
  );
};
const PageStyled = styled(Page)`
  padding-top: 100px;
  background-image: url('./images/stake/bg_element.svg');
  background-size: 420px;
  background-repeat: no-repeat;
  background-position: 60px 45px;
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
      height: 410px;
      margin-bottom: 20px;

      ${({ theme }) => theme.mediaQueries.md} {
        margin-top: 0;
        width: 49%;
        max-width: 585px;
        height: 520px;
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
      ${({ theme }) => theme.mediaQueries.sm} {
        background-color: #181733;
        border: 1px solid #2e2d5b;
      }
      ${({ theme }) => theme.mediaQueries.md} {
        margin-top: 40px;
        margin-bottom: 0;
      }
    }
  }
`;
export default Governance;
