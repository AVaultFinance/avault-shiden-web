import { Button } from '@my/ui';
import BigNumber from 'bignumber.js';
import Timer from 'components/CountdownTimer/Timer';
import useNextEventCountdown from 'components/CountdownTimer/useNextEventCountdown';
import InputBalance from 'components/InputBalance';
import { useCallback, useMemo, useState } from 'react';
import { IIdoStateEnum } from 'state/ido/types';
import styled from 'styled-components';
import { getFullDisplayBalance, getFullLocalDisplayBalance } from 'utils/formatBalance';
import getTimePeriods from 'utils/getTimePeriods';
interface IProps {
  nextEventTime: number;
  idoState: IIdoStateEnum;
  maxASTRBalance: string;
  lpBalance: string;
}
const Contribution = ({ nextEventTime, idoState, maxASTRBalance, lpBalance }: IProps) => {
  return useMemo(() => {
    return (
      <ContributionStyled>
        <div className="inner">
          <h2 className="h2">Contribution Your ASTR</h2>
          <div className="img">
            <img src="/images/ido/icon01.webp" alt="ASTR" />
            <img src="/images/ido/icon02.webp" alt="ASTR" />
          </div>
          {idoState === IIdoStateEnum.INIT ? <InitComponents nextEventTime={nextEventTime} /> : null}
          {idoState === IIdoStateEnum.PROCING ? <PROCINGComponents max={maxASTRBalance} idoState={idoState} /> : null}
          {idoState === IIdoStateEnum.END ? <PROCINGComponents max={lpBalance} idoState={idoState} /> : null}
        </div>
      </ContributionStyled>
    );
  }, [nextEventTime, idoState, maxASTRBalance, lpBalance]);
};
const InitComponents = ({ nextEventTime }) => {
  // 15000000000 s
  const secondsRemaining = useNextEventCountdown(nextEventTime);
  const { days, hours, minutes, seconds } = getTimePeriods(secondsRemaining);
  return useMemo(() => {
    return (
      <div className="bottom">
        <h3>Coming Soon</h3>
        {secondsRemaining ? (
          <Timer
            minutes={minutes} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={hours}
            days={days}
            seconds={seconds}
            bgColor="#030222"
          />
        ) : (
          <Timer
            minutes={0} // We don't show seconds - so values from 0 - 59s should be shown as 1 min
            hours={0}
            days={0}
            seconds={0}
            bgColor="#030222"
          />
        )}
      </div>
    );
  }, [secondsRemaining, days, hours, minutes, seconds]);
};
interface IPROCINGComponents {
  idoState: IIdoStateEnum;
  max: string;
}
const PROCINGComponents = ({ idoState, max }: IPROCINGComponents) => {
  const [val, setVal] = useState('');

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max));
  }, [max]);
  const fullLocalBalance = useMemo(() => {
    return getFullLocalDisplayBalance(new BigNumber(max), 18);
  }, [max]);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setVal],
  );
  const { title, btnTitle } = useMemo(() => {
    switch (idoState) {
      case IIdoStateEnum.PROCING:
        return {
          title: `Your Balance ${fullLocalBalance} ASTR`,
          btnTitle: 'Create LP',
        };
      case IIdoStateEnum.END:
        return {
          title: `AVAT-ASTR LP Balance: ${fullLocalBalance}`,
          btnTitle: 'Take LP',
        };
      default:
        return {
          title: '',
          btnTitle: '',
        };
    }
  }, [fullLocalBalance, idoState]);
  return useMemo(() => {
    return (
      <div className="bottom">
        <h4 className="h4">{title}</h4>
        <div className="border">
          <InputBalance value={val} onSelectMax={handleSelectMax} onChange={handleChange} />
        </div>
        <Button className="btn">{btnTitle}</Button>
      </div>
    );
  }, [handleChange, handleSelectMax, val, title, btnTitle]);
};
const ContributionStyled = styled.div`
  padding-bottom: 180px;
  position: relative;
  .inner {
    background-image: linear-gradient(140deg, #20d4a9 0%, #a428d0 79%);
    border-radius: 20px 20px 0 0;
    padding-bottom: 40px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-bottom: 70px;
    }
    .h2 {
      font-size: 36px;
      font-weight: 800;
      line-height: 40px;
      padding: 30px 30px 0;
      ${({ theme }) => theme.mediaQueries.md} {
        padding: 40px 40px 0;
        line-height: 52px;
        font-size: 38px;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 48px;
      }
    }
    h3 {
      font-size: 30px;
      font-weight: 800;
      text-align: center;
      padding-bottom: 20px;
      ${({ theme }) => theme.mediaQueries.md} {
        padding-bottom: 36px;
      }
    }
    .img {
      clear: both;
      overflow: hidden;
      padding-bottom: 20px;
      ${({ theme }) => theme.mediaQueries.sm} {
        padding-bottom: 60px;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 120px;
      }
      img {
        display: inline-block;
        vertical-align: middle;
      }
      img:first-child {
        width: 55%;
        margin-left: 40%;
        margin-top: 20px;
        margin-right: 40px;
        ${({ theme }) => theme.mediaQueries.sm} {
          margin-top: 100px;
        }
        ${({ theme }) => theme.mediaQueries.lg} {
          margin-left: 0;
          width: 23%;
          margin-top: 170px;
          margin-right: 11%;
        }
      }
      img:last-child {
        width: 40%;
        padding-left: 10%;
        ${({ theme }) => theme.mediaQueries.lg} {
          width: 46%;
          padding-left: 0;
        }
      }
    }
    .bottom {
      width: 100%;
      left: 0;
      bottom: 0;
      position: absolute;
      padding: 30px 30px 40px;
      background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #181733 100%);
      box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
      border-radius: 20px;
      ${({ theme }) => theme.mediaQueries.lg} {
        padding: 40px 44px 44px;
      }
      .h4 {
        font-size: 14px;
        padding-bottom: 20px;
        text-align: center;
        ${({ theme }) => theme.mediaQueries.md} {
          font-size: 15px;
          padding-bottom: 27px;
        }
      }
      .border {
        border: 4px solid #2e2d5b;
        background-color: #030222;
        box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
        border-radius: 12px;
        padding: 0 20px;
        input {
          font-size: 20px;
          height: 40px;
          ${({ theme }) => theme.mediaQueries.md} {
            font-size: 30px;
            height: 72px;
          }
        }
        button {
          font-size: 16px;
        }
      }
      .btn {
        height: 40px;
        border-radius: 12px;
        margin-top: 20px;
        width: 100%;
        font-size: 16px;
        ${({ theme }) => theme.mediaQueries.md} {
          margin-top: 30px;
          height: 60px;
          font-size: 18px;
        }
      }
    }
  }
`;
export default Contribution;
