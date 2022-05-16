import { useSelector } from 'react-redux';
import { State } from 'state/types';
import { GovernanceState } from './types';

export const useGovernanceData = (): GovernanceState => {
  const governanceData = useSelector((state: State) => state.governance);
  return governanceData;
};

export const useGovernanceHasLocked = (): boolean => {
  const hasLocked = useSelector((state: State) => state.governance.hasLocked);
  return hasLocked;
};

export const useGovernanceAllTotal = () => {
  const governance = useSelector((state: State) => state.governance);
  return governance.tvlTotal;
};
