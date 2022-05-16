export interface IGovernanceUserData {
  AVATBalance: string;
  xAVATBalance: string;
  AVATLocked: string;
  remainderBlock: number;
  withdrawalDate: string;
}
export interface GovernanceState {
  rewards: any[];
  hasLocked: boolean;
  apy: string;
  tvlTotal: string;
  avarageLockTime: string;
  totalAVATLocked: string;

  userData: Record<string, IGovernanceUserData>;

  isUserLoaded: boolean;
}
