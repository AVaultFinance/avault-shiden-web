export enum IIdoStateEnum {
  INIT,
  PROCING,
  END,
}
export interface IIdoState {
  idoState: IIdoStateEnum;
  isUserLoaded: boolean;
  avatEstimatedPrice: string;
  network: string;
  maxASTRBalance: Record<string, string>;
  endTime: number;

  apr: string;
  amountInPool: string;
  rewards: string;
  lpTotalBalance: string;
  lpBalance: Record<string, string>;
}
