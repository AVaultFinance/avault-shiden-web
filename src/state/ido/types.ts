export enum IIdoStateEnum {
  INIT,
  PROCING,
  END,
}
export interface IIdoState {
  idoState: IIdoStateEnum;
  isUserLoaded: boolean;
  maxASTRBalance: string;
}
