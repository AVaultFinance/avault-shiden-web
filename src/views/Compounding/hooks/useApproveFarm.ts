import { useCallback } from 'react';
import { ethers, Contract } from 'ethers';
import { useContract, useMasterchef } from 'hooks/useContract';
import AVaultPCS_ABI from 'config/abi/AVaultPCS_ABI.json';

const useApproveFarm = (lpContract: Contract) => {
  const masterChefContract = useMasterchef();
  const handleApprove = useCallback(async () => {
    try {
      const tx = await lpContract.approve(masterChefContract.address, ethers.constants.MaxUint256);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [lpContract, masterChefContract]);

  return { onApprove: handleApprove };
};

export const useSpecialApproveFarm = (lpContract: Contract, avaultAddress: string) => {
  const contractAddressContract = useContract(avaultAddress, AVaultPCS_ABI);
  const handleApprove = useCallback(async () => {
    console.log('contractAddressContract', contractAddressContract.address);
    try {
      const tx = await lpContract.approve(contractAddressContract.address, ethers.constants.MaxUint256);
      const receipt = await tx.wait();
      return receipt.status;
    } catch (e) {
      return false;
    }
  }, [lpContract, contractAddressContract]);

  return { onApprove: handleApprove };
};
export default useApproveFarm;
