import React from 'react';
import BigNumber from 'bignumber.js';
import { getFullDisplayBalance } from 'utils/formatBalance';
import { Text } from '@avault/ui';
import styled from 'styled-components';
import { MaxButton } from '../style/DappstakeStyle';
const TextStyle = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;
const Balance = (props) => {
  const {
    balance = new BigNumber(0),
    decimals,
    symbol,
  }: {
    balance: BigNumber;
    decimals: number;
    symbol: string;
  } = props;
  // const displayBalance = (balance: string) => {
  //   if (isBalanceZero) {
  //     return '0';
  //   }
  //   const balanceUnits = parseUnits(balance, 18);
  //   console.log(balance);
  //   return formatBigNumber(balanceUnits, 18, 18);
  // };
  return (
    <>
      <TextStyle>
        LP Balance: {getFullDisplayBalance(new BigNumber(balance), decimals, 4)} {symbol}
        <MaxButton variant="text">Max</MaxButton>
      </TextStyle>
    </>
  );
};
export default Balance;
