export enum IIdoStateEnum {
  INIT,
  PROCING,
  WAITINGGETLP,
  END,
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
}
