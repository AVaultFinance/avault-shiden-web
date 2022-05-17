import { Button, Modal } from '@my/ui';
import BigNumber from 'bignumber.js';
import { AVAT, main_tokens } from 'config/constants/tokens';
import useToast from 'hooks/useToast';
import { useCallback, useMemo, useState } from 'react';
import { useLockAVATModalState } from 'state/governance/hooks';
import { ILockAVATModalState } from 'state/governance/types';
import styled from 'styled-components';
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance';
import { ITokenType } from 'views/Zap/utils/types';
import BalanceInput from './components/BalanceInput';
import LockInfo from './components/LockInfo';
import WeeksInput from './components/WeeksInput';

interface IProps {
  account: string;
  max: string;
  onDismiss?: () => void;
  isUserLoaded: boolean;
}
const LockAVATModal = ({ account, max, isUserLoaded, onDismiss }: IProps) => {
  const lockAVATModalState: ILockAVATModalState = useLockAVATModalState();
  // console.log({ lockAVATModalState });
  const [balanceVal, setBalanceVal] = useState('');
  const [weekVal, setWeekVal] = useState('');
  const [weekLiVal, setWeekLiVal] = useState('');
  const { toastWarning } = useToast();

  const handleBalanceChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setBalanceVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setBalanceVal],
  );
  const handleWeekChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setWeekVal(e.currentTarget.value.replace(/,/g, '.'));
      }
    },
    [setWeekVal],
  );
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max));
  }, [max]);
  const handleSelectMax = useCallback(() => {
    setBalanceVal(fullBalance);
  }, [fullBalance, setBalanceVal]);
  const onPressHandle = useCallback(() => {
    console.log(1111);
    const weekValue = Number(weekVal || weekLiVal);
    const balanceValue = Number(balanceVal);
    if (weekValue <= 0 || weekValue > 208) {
      toastWarning('Warn', 'Select between 1 to 208 weeks');
      return;
    }
    const maxBalance = getBalanceNumber(new BigNumber(max));
    if (balanceValue <= 0 || balanceValue > maxBalance) {
      toastWarning('Warn', 'Insufficient Balance');
      return;
    }
    // 24*60*60  1day/s
    const timestamp = 24 * 60 * 60 * weekValue * 7;
    const nowTimestamp = Number((new Date().valueOf() / 1000).toFixed(0));
    const aimTimestamp = timestamp + nowTimestamp;
    console.log('aimTimestamp: ', aimTimestamp);
  }, [balanceVal, weekVal, weekLiVal, max, toastWarning]);
  const title = useCallback(() => {
    switch (lockAVATModalState) {
      case ILockAVATModalState.INIT:
        return 'Lock AVAT';
      case ILockAVATModalState.ADDAMOUNT:
        return 'Add Lock AVAT';
      case ILockAVATModalState.CHANGELOCKTIME:
        return 'Extend Lock Time';
      case ILockAVATModalState.WITHDRAW:
        return 'Withdraw';
      default:
        return 'Lock AVAT';
    }
  }, [lockAVATModalState]);
  return useMemo(() => {
    return (
      <LockAVATModalStyled title={title()} onDismiss={onDismiss} bodyPadding="0" headerPadding="12px 5% 0">
        <div className="inner">
          {lockAVATModalState !== ILockAVATModalState.CHANGELOCKTIME ? (
            <BalanceInput
              isUserLoaded={isUserLoaded}
              account={account}
              balance={max}
              handleSelectMax={handleSelectMax}
              val={balanceVal}
              handleChange={handleBalanceChange}
              token={{
                type: ITokenType.TOKEN,
                symbol: AVAT.symbol,
                address: main_tokens.avat.address,
                decimals: AVAT.decimals,
              }}
            />
          ) : null}

          {lockAVATModalState !== ILockAVATModalState.ADDAMOUNT &&
          lockAVATModalState !== ILockAVATModalState.WITHDRAW ? (
            <WeeksInput
              val={weekVal}
              setWeekVal={setWeekVal}
              handleChange={handleWeekChange}
              weekLiVal={weekLiVal}
              setWeekLiVal={setWeekLiVal}
            />
          ) : null}
          {lockAVATModalState !== ILockAVATModalState.WITHDRAW ? <LockInfo /> : null}
          <ButtonStyled onClick={onPressHandle}>Confirm</ButtonStyled>
        </div>
      </LockAVATModalStyled>
    );
  }, [
    account,
    balanceVal,
    handleBalanceChange,
    handleSelectMax,
    handleWeekChange,
    isUserLoaded,
    lockAVATModalState,
    max,
    onDismiss,
    onPressHandle,
    title,
    weekLiVal,
    weekVal,
  ]);
};
const LockAVATModalStyled = styled(Modal)`
  width: 80%;
  padding-bottom: 100px;
  position: relative;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 520px;
  }
  .inner {
    width: 90%;
    margin: 0 auto;
    max-height: 400px;
    overflow-y: auto;
    ${({ theme }) => theme.mediaQueries.md} {
      max-height: 600px;
    }
  }
`;
const ButtonStyled = styled(Button)`
  // height: 48px;
  // display: block;
  width: 90%;
  position: absolute;
  bottom: 30px;
  left: 5%;
`;
export default LockAVATModal;
