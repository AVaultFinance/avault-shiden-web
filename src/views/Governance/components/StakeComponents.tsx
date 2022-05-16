// import getTimePeriods from 'utils/getTimePeriods';
import { Button } from '@my/ui';
import styled from 'styled-components';
import StakeBalance from './StakeComponents/Balance';
import Countdown from './StakeComponents/Countdown';

const StakeComponents = () => {
  return (
    <div>
      <StakeComponentsStyled>
        <StakeBalance />
        {/* 12s  300block */}
        <Countdown nextEventTime={12 * 30000} />
        <LongButton>Create Lock</LongButton>
      </StakeComponentsStyled>
    </div>
  );
};
const StakeComponentsStyled = styled.div`
  position: relative;
  padding: 8% 5%;
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 6% 5% 8%;
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
export default StakeComponents;
