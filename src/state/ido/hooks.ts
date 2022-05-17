import { useSelector } from 'react-redux';
import { State } from 'state/types';
import { IIdoState } from './types';

export const useIdoData = (): IIdoState => {
  const idoData = useSelector((state: State) => state.ido);
  return idoData;
};
