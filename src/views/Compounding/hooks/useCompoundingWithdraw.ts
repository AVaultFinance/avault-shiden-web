import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import { withdrawCompoundingUtil } from '../utils';

const useCompoundingWithdraw = (account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress);

  const handleWithdraw = useCallback(
    async (amount: string) => {
      // const txHash =
      await withdrawCompoundingUtil(contractAddressContract, account, amount, decimal);
    },
    [contractAddressContract, account, decimal],
  );

  return { onWithdraw: handleWithdraw };
};

export default useCompoundingWithdraw;
