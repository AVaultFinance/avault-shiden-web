import { Button, Modal } from '@my/ui';
import BigNumber from 'bignumber.js';
import { AVAT, main_tokens } from 'config/constants/tokens';
import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getFullDisplayBalance } from 'utils/formatBalance';
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
  const [balanceVal, setBalanceVal] = useState('');
  const [weekVal, setWeekVal] = useState('');

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
  return (
    <LockAVATModalStyled title="Lock AVAT" onDismiss={onDismiss}>
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

      <WeeksInput val={weekVal} handleChange={handleWeekChange} />
      <LockInfo />
      <Button>Confirm</Button>
    </LockAVATModalStyled>
  );
};
const LockAVATModalStyled = styled(Modal)`
  width: 520px;
`;
export default LockAVATModal;
