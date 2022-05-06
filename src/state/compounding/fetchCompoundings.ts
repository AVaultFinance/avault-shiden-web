import fetchCompounding from './fetchCompounding';
import { ICompounding, ICompoundingConfigItem } from './types';
import BigNumber from 'bignumber.js';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { isNaNString } from 'views/Compounding/utils';

const fetchCompoundings = async (
  compoundings: ICompoundingConfigItem[],
  priceVsBusdMap: Record<string, string>,
): Promise<[ICompounding[], string]> => {
  const data = await Promise.all(
    compoundings.map(async (compoundingConfig) => {
      const compounding = await fetchCompounding(compoundingConfig, priceVsBusdMap);
      return compounding;
    }),
  );
  let _total = BIG_ZERO;
  const _data = [];
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    if (v.farm.lpTokenPrice) {
      // 210000000200000
      const _liquidity = new BigNumber(v.compounding.wantLockedTotal)
        .div(BIG_TEN.pow(new BigNumber(v.compounding.decimals)))
        .times(Number(v.farm.lpTokenPrice))
        .toNumber()
        .toLocaleString('en-US', { maximumFractionDigits: 8 });
      _total = _total.plus(Number(_liquidity));
      _data.push({
        ...v,
        compounding: {
          ...v.compounding,
          liquidity: _liquidity,
        },
      });
    } else {
      _data.push(v);
    }
  }
  const total = isNaNString(_total.toString());
  return [_data, total];
};
export default fetchCompoundings;
