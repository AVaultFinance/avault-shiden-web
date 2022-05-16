import React from 'react';
import getTimePeriods from 'utils/getTimePeriods';
import Timer from './Timer';
import useNextEventCountdown from './useNextEventCountdown';
import styled from 'styled-components';
import { Button } from '@my/ui';

interface IProps {
  nextEventTime: number;
  hasLocked: boolean;
}

const Countdown: React.FC<IProps> = ({ nextEventTime, hasLocked }: IProps) => {
  // 15000000000 s
  const secondsRemaining = useNextEventCountdown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);
  return (
    <TimerComponentsStyled>
      {secondsRemaining ? (
        <Timer
          minutes={minutes + 1} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
          hours={hours}
          days={days}
          seconds={seconds}
        />
      ) : (
        <Timer
          minutes={0} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
          hours={0}
          days={0}
          seconds={0}
        />
      )}
      <h3 className="TimerComponents_title">Remaining Locked time</h3>
      {hasLocked ? <Button className="btn">Extend lock time</Button> : null}
    </TimerComponentsStyled>
  );
};
const TimerComponentsStyled = styled.div`
  border-radius: 20px;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    border: 1px solid #2e2d5b;
    padding: 30px 60px;
  }
  .TimerComponents_title {
    padding-top: 24px;
    font-size: 15px;
    ${({ theme }) => theme.mediaQueries.lg} {
      padding-top: 25px;
      font-size: 20px;
    }
  }
  .btn {
    font-weight: 500;
    font-size: 12px;
    color: #cc64f2;
    margin-top: 16px;
    height: 30px;
    background: #25234c;
    border-radius: 12px;
  }
`;
export default Countdown;
