import { useCallback } from 'react';
import { useAVaultPCSContract } from 'hooks/useContract';
import { depositCompoundingUtil } from '../utils';
const useCompoundingDeposit = (account: string, contractAddress: string, decimal: number) => {
  const contractAddressContract = useAVaultPCSContract(contractAddress);

  const handleDeposit = useCallback(
    async (amount: string) => {
      // const txHash =
      await depositCompoundingUtil(contractAddressContract, account, amount, decimal);
    },
    [contractAddressContract, account, decimal],
  );

  return { onDeposit: handleDeposit };
};

export default useCompoundingDeposit;
