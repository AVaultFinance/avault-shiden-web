import React, { useState, useCallback } from 'react';
import { Button } from '@avault/ui';
import BigNumber from 'bignumber.js';
import { InputWrap, PageContainerWrap, StyledInput, StyledTokenInputTop } from './style/DappstakeStyle';
import Balance from './components/StakeTableBalance';
import DappstakePage from './components/DappstakePage';
import PageLayout from 'components/Layout/Page';
import { useDAppStackingContract } from 'hooks/useContract';
import { GetPoolUpdate } from './hooks/getPoolUpdate';
import { escapeRegExp } from 'utils';
import useStakeWrap from './hooks/useStakeWrap';
import TokenIconItem from './components/TokenIconItem';
import ArrowDown from './components/svg/arrow_down';
import StakeFr from './components/StakeFr';
const Stake = () => {
  const {
    balance,
    isBalanceZero,
    decimals,
    fullBalance,
  }: {
    balance: BigNumber;
    isBalanceZero: boolean;
    decimals: number;
    fullBalance: string;
    pid: number;
  } = useStakeWrap();
  // 获取合约
  const contract = useDAppStackingContract();
  const pool = GetPoolUpdate(contract);
  const [val, setVal] = useState('');
  const [pendingTx] = useState(false);
  const lpTokensToStake = new BigNumber(val);
  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        const nextUserInput = e.currentTarget.value.replace(/,/g, '.');
        if (nextUserInput === '' || RegExp(`^\\d*(?:\\\\[.])?\\d*$`).test(escapeRegExp(nextUserInput))) {
          setVal(nextUserInput);
        }
      }
    },
    [setVal],
  );
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);
  return (
    <PageLayout>
      <PageContainerWrap>
        <DappstakePage contract={contract} pool={pool}>
          <Balance
            balance={balance}
            decimals={18}
            symbol="AVA"
            isBalanceZero={isBalanceZero}
            handleSelectMax={handleSelectMax}
          />
          <InputWrap>
            <StyledTokenInputTop isWarning={false}>
              <TokenIconItem symbol="AVA" tokenAddress="0x0a3A21356793B49154Fd3BbE91CBc2A16c0457f5" />
              <StyledInput
                pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                inputMode="decimal"
                step="any"
                min="0"
                onChange={handleChange}
                placeholder="0"
                value={val}
              />
            </StyledTokenInputTop>
            <StyledTokenInputTop isWarning={false}>
              <TokenIconItem symbol="aAVA" tokenAddress="aava" />
              <StyledInput
                pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
                inputMode="decimal"
                step="any"
                min="0"
                onChange={handleChange}
                placeholder="0"
                value={val}
              />
            </StyledTokenInputTop>
            <ArrowDown />
          </InputWrap>
          <Button
            width="100%"
            padding="0"
            disabled={pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(balance)}
            // onClick={async () => {
            //   setPendingTx(true);
            //   try {
            //     await UseStakeDApp(contract, account, val);
            //     toastSuccess('Staked!', 'Your funds have been staked in the App');
            //   } catch (e) {
            //     toastError(
            //       'Error',
            //       'Please try again. Confirm the transaction and make sure you are paying enough gas!',
            //     );
            //     console.error(e);
            //   } finally {
            //     setPendingTx(false);
            //   }
            // }}
          >
            Confirm
            {/* {pendingTx ? 'Confirming' : ''} */}
          </Button>
        </DappstakePage>
        <StakeFr />
      </PageContainerWrap>
    </PageLayout>
  );
};

export default Stake;
