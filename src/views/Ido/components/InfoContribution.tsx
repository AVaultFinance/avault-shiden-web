import { Button } from '@my/ui';
import Timer from 'components/CountdownTimer/Timer';
import useNextEventCountdown from 'components/CountdownTimer/useNextEventCountdown';
import { useMemo } from 'react';
import { IIdoStateEnum } from 'state/ido/types';
import styled from 'styled-components';
import getTimePeriods from 'utils/getTimePeriods';
interface IProps {
  idoState: IIdoStateEnum;
  endTime: number;
  avatEstimatedPrice: string;
  network: string;

  apr: string;
  amountInPool: string;
  rewards: string;
}
const InfoContribution = ({ idoState, endTime, avatEstimatedPrice, network, apr, amountInPool, rewards }: IProps) => {
  return (
    <InfoContributionStyled>
      {idoState === IIdoStateEnum.END ? (
        <AprComponents apr={apr} idoState={idoState} />
      ) : (
        <AVATPriceComponents avatEstimatedPrice={avatEstimatedPrice} idoState={idoState} />
      )}
      {idoState === IIdoStateEnum.END ? (
        <AmountComponents amountInPool={amountInPool} idoState={idoState} />
      ) : (
        <NetworkComponents network={network} idoState={idoState} />
      )}
      <BottomComponents endTime={endTime} idoState={idoState} rewards={rewards} />
    </InfoContributionStyled>
  );
};

const AprComponents = ({ idoState, apr }) => {
  return useMemo(() => {
    return (
      <>
        <h2 className="h2 fl_dot">
          {apr}%{idoState !== IIdoStateEnum.INIT ? <i></i> : null}
        </h2>
        <h3 className="h3">Somthing APR</h3>
      </>
    );
  }, [idoState, apr]);
};

const AVATPriceComponents = ({ avatEstimatedPrice, idoState }) => {
  return useMemo(() => {
    return (
      <>
        <h2 className="h2 fl_dot">
          ${avatEstimatedPrice}
          {idoState !== IIdoStateEnum.INIT ? <i></i> : null}
        </h2>
        <h3 className="h3">AVAT Estimated price</h3>
      </>
    );
  }, [avatEstimatedPrice, idoState]);
};
const AmountComponents = ({ idoState, amountInPool }) => {
  return useMemo(() => {
    return (
      <>
        <h2 className="h2 fr fr_dot">
          {idoState !== IIdoStateEnum.INIT ? <i className="h5"></i> : null}
          {amountInPool}
          {idoState !== IIdoStateEnum.INIT ? <i className="pc"></i> : null}
        </h2>
        <h3 className="h3 fr">ASTR Amount In Pool</h3>
      </>
    );
  }, [idoState, amountInPool]);
};
const NetworkComponents = ({ network, idoState }) => {
  return useMemo(() => {
    return (
      <>
        <h2 className="h2 fr fr_dot">
          {idoState !== IIdoStateEnum.INIT ? <i className="h5"></i> : null}
          {network}
          {idoState !== IIdoStateEnum.INIT ? <i className="pc"></i> : null}
        </h2>
        <h3 className="h3 fr">The network is in Astar</h3>
      </>
    );
  }, [network, idoState]);
};
const BottomComponents = ({ endTime, idoState, rewards }) => {
  return useMemo(() => {
    switch (idoState) {
      case IIdoStateEnum.INIT:
        return null;
      case IIdoStateEnum.PROCING:
        return <EndTimeComponents endTime={endTime} />;
      case IIdoStateEnum.END:
        return <RewardsComponents rewards={rewards} />;
      default:
        return null;
    }
  }, [endTime, idoState, rewards]);
};
const RewardsComponents = ({ rewards }) => {
  return useMemo(() => {
    return (
      <RewardsComponentsStyled>
        <h2 className="reward_h2">{rewards}</h2>
        <h3 className="h3 reward_h3">ASTR Rewards</h3>
        <Button>Claim</Button>
      </RewardsComponentsStyled>
    );
  }, [rewards]);
};
const EndTimeComponents = ({ endTime }) => {
  const secondsRemaining = useNextEventCountdown(endTime);
  const { months, days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);
  return useMemo(() => {
    return (
      <EndTimeComponentsStyled>
        <h3 className="timer_h3">
          Remaining <br />
          contribution time
        </h3>
        <div className="timer">
          {secondsRemaining ? (
            <Timer
              showMonths={true}
              months={months}
              minutes={minutes} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
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
        </div>
      </EndTimeComponentsStyled>
    );
  }, [secondsRemaining, months, days, hours, minutes, seconds]);
};
const RewardsComponentsStyled = styled.div`
  .reward_h2 {
    display: inline-block;
    font-size: 48px;
    background: linear-gradient(270deg, #00f4b9 0%, #ff4afb 100%);
    -webkit-background-clip: text;
    color: transparent;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 80px;
    }
  }
  h3.reward_h3 {
    padding-bottom: 30px;
  }
  button {
    background-image: linear-gradient(90deg, #a428d0 0%, #20d4a9 100%);
    border-radius: 8px;
    padding: 0 56px;
    margin-bottom: 100px;
  }
`;
const EndTimeComponentsStyled = styled.div`
  padding-bottom: 80px;
  .timer_h3 {
    font-size: 30px;
    width: 90%;
    padding-top: 20px;
    padding-bottom: 30px;
    line-height: 36px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 40px;
      line-height: 50px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 48px;
    }
  }
  .timer {
    width: 100%;
  }
`;
const InfoContributionStyled = styled.div`
  padding-top: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 40px;
  }
  .fr {
    text-align: right;
    ${({ theme }) => theme.mediaQueries.md} {
      text-align: left;
    }
  }
  .h2 {
    font-size: 48px;
    line-height: 52px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 60px;
      line-height: 80px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      font-size: 80px;
      line-height: 100px;
    }
    i {
      margin-top: 10px;
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-image: conic-gradient(from 1.5708rad at 50% 50%, #ce55f9 0%, #65fdd8 100%);
      vertical-align: top;
      ${({ theme }) => theme.mediaQueries.md} {
        width: 20px;
        height: 20px;
      }
    }
    &.fl_dot {
      i {
        margin-left: 26px;
        box-shadow: 0 0 0 4px #020222;
        ${({ theme }) => theme.mediaQueries.md} {
          box-shadow: 0 0 0 7px #020222;
        }
      }
    }
    &.fr_dot {
      i {
        margin-right: 26px;
        box-shadow: 0 0 0 4px rgb(49 218 177 / 25%), 0 0 0 8px rgb(49 218 177 / 10%);
        ${({ theme }) => theme.mediaQueries.md} {
          box-shadow: 0 0 0 7px rgb(49 218 177 / 25%), 0 0 0 14px rgb(49 218 177 / 10%);
        }
        &.pc {
          display: none;
          margin-left: 30px;
          ${({ theme }) => theme.mediaQueries.md} {
            display: inline-block;
          }
        }
        &.h5 {
          display: inline-block;
          ${({ theme }) => theme.mediaQueries.md} {
            display: none;
          }
        }
      }
    }
  }
  .h3 {
    font-size: 14px;
    padding-bottom: 40px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding-bottom: 60px;
    }
    ${({ theme }) => theme.mediaQueries.xl} {
      padding-bottom: 80px;
    }
  }
`;
export default InfoContribution;
