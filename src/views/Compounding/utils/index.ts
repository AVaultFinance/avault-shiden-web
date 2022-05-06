import BigNumber from 'bignumber.js';
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config';
import { BIG_TEN } from 'utils/bigNumber';

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
};
export const isNaNString = (num: string | number) => {
  if (`${num}` === 'NaN') {
    return '';
  }
  return `${num}`;
};
export const depositCompoundingUtil = async (contract, account: string, amount, decimal: number) => {
  const value = new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString();
  console.log({ amount, account, value, options, decimal });
  const tx = await contract.deposit(account, `${value}`, options);
  const receipt = await tx.wait();
  return receipt.status;
};

export const withdrawCompoundingUtil = async (contract, account: string, amount, decimal: number) => {
  const value = parseInt(new BigNumber(amount).times(BIG_TEN.pow(decimal)).toString());
  console.log({ amount, account, value, options, decimal });
  const tx = await contract.withdraw(account, `${value}`, options);
  const receipt = await tx.wait();
  return receipt.status;
};

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString();
  const tx = await masterChefContract.withdraw(pid, value, options);
  const receipt = await tx.wait();
  return receipt.status;
};

export const harvestFarm = async (masterChefContract, pid) => {
  if (pid === 0) {
    const tx = await await masterChefContract.leaveStaking('0', options);
    const receipt = await tx.wait();
    return receipt.status;
  }

  const tx = await masterChefContract.deposit(pid, '0', options);
  const receipt = await tx.wait();
  return receipt.status;
};
