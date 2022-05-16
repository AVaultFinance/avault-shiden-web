import React from 'react';
import styled from 'styled-components';
import { Flex } from '@my/ui';

export interface TimerProps {
  minutes?: number;
  hours?: number;
  days?: number;
  seconds?: number;
}

const StyledTimerText = styled.div`
  width: 23%;
  padding: 16px 0;
  background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #181733 100%);
  border: 4px solid #2e2d5b;
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px 0 18px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 30px 0 27px;
  }
  h2 {
    font-size: 24px;
    padding-bottom: 8px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 30px;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 36px;
      padding-bottom: 20px;
    }
  }
  h4 {
    font-size: 12px;
    color: #6a6991;
    ${({ theme }) => theme.mediaQueries.lg} {
      font-size: 15px;
    }
  }
`;
const FlexStyled = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

const Timer: React.FC<TimerProps> = ({ minutes, hours, days, seconds }) => {
  return (
    <FlexStyled>
      <StyledTimerText>
        <h2>{days >= 10 ? days : `0${days}`}</h2>
        <h4>Days</h4>
      </StyledTimerText>
      <StyledTimerText>
        <h2>{hours >= 10 ? hours : `0${hours}`}</h2>
        <h4>Hours</h4>
      </StyledTimerText>
      <StyledTimerText>
        <h2>{minutes >= 10 ? minutes : `0${minutes}`}</h2>
        <h4>Min</h4>
      </StyledTimerText>
      <StyledTimerText>
        <h2>{seconds >= 10 ? seconds : `0${seconds}`}</h2>
        <h4>Sec</h4>
      </StyledTimerText>
    </FlexStyled>
  );
};

export default Timer;
