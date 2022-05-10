import { useCallback } from 'react';
import { stakeFarm } from 'utils/calls';
import { useSpecialMasterchef } from 'hooks/useContract';
const useStakeFarms = (abi: any, masterChefAddress: string, pid: number) => {
  const masterChefContract = useSpecialMasterchef(abi, masterChefAddress);

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeFarm(masterChefContract, pid, amount);
      console.info(txHash);
    },
    [masterChefContract, pid],
  );

  return { onStake: handleStake };
};

export default useStakeFarms;
