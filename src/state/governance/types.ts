export interface IGovernanceUserData {
  AVATBalance: string;
  xAVATBalance: string;
  AVATLocked: string;
  remainderBlock: number;
  withdrawalDate: string;
}
export enum ILockAVATModalState {
  INIT,
  ADDAMOUNT,
  CHANGELOCKTIME,
  WITHDRAW,
}
export interface GovernanceState {
  rewards: any[];
  // 0: init;
  // 1: add amount
  // 2 change lock time
  lockAVATModalState: ILockAVATModalState;
  hasLocked: boolean;
  apy: string;
  tvlTotal: string;
  avarageLockTime: string;
  totalAVATLocked: string;

  userData: Record<string, IGovernanceUserData>;

  isUserLoaded: boolean;
}
