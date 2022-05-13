import { Flex } from '@my/ui';
import Page from 'components/Layout/Page';
import styled from 'styled-components';
import Rewards from './components/Rewards';
import StakeComponents from './components/StakeComponents';
import StakeingInfo from './components/StakeingInfo';

const Governance = () => {
  return (
    <Page>
      <PageWrapFlex>
        <StakeingInfo />
        <StakeComponents />
        <Rewards />
      </PageWrapFlex>
    </Page>
  );
};
const PageWrapFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;
export default Governance;
