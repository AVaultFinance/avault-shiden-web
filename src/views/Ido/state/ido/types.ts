export enum IIdoStateEnum {
  INIT = 'INIT',
  PROCING = 'PROCING',
  WAITINGGETLP = 'WAITINGGETLP',
  END = 'END',
}
export interface IIdoState {
  idoState: IIdoStateEnum;
  isUserLoaded: boolean;
  avatEstimatedPrice: string;
  maxASTRBalance: Record<string, string>;
  mainTokenPrice: string;
  startTime: number;
  endTime: number;
  idoInAstrBalance: string;
  avatInIdoBalance: string;
  apr: string;
  amountInPool: string;
  rewards: string;
  lpTotalBalance: string;
  lpBalance: Record<string, string>;
}

export interface IFetchIdoCallback {
  avatInIdoBalance: string;
  maxASTRBalance?: Record<string, string>;
  idoInAstrBalance?: string;
  lpTotalBalance?: string;
  idoState?: string;
  endTime?: string;
  startTime?: string;
  amountInPool?: string;
  rewards?: string;
}
