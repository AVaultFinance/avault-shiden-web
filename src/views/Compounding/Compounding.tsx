import React, { useCallback, useState, useMemo, useRef } from 'react';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import { RowType } from '@avault/ui';
import Page from 'components/Layout/Page';
import { usePriceCakeBusd } from 'state/farms/hooks';
import { getBalanceNumber } from 'utils/formatBalance';
import { getFarmApr } from 'utils/apr';
import { orderBy } from 'lodash';
import CompoundingTable from './components/CompoundingTable/CompoundingTable';

import { DesktopColumnSchema } from './components/types';
import useKacPerBlock from './hooks/useAvaultPerBlock';
import { OptionProps } from 'components/Select/Select';
import { ISortDir } from 'components/SortIcon';
import { RowProps } from './components/CompoundingTable/Row';
import { useCompounding, useCompoundingUserData, usePollCompoundingData } from 'state/compounding/hooks';
import { ICompounding } from 'state/compounding/types';
import { usePrice } from 'state/price/hooks';
import PageLoader from 'components/Loader/PageLoader';
// const StyledImage = styled(Image)`
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 58px;
// `;
export const getDisplayApr = (cakeRewardsApr?: number, lpRewardsApr?: number): string => {
  if (cakeRewardsApr && lpRewardsApr) {
    return (cakeRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr) {
    return cakeRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApr === 0 && lpRewardsApr === 0) {
    return '0';
  }
  return null;
};

export const getDisplayApy = (cakeRewardsApy?: number): string => {
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy) {
    return cakeRewardsApy.toLocaleString('en-US', { maximumFractionDigits: 2 });
  }
  if (cakeRewardsApy === 0) {
    return '0';
  }
  return null;
};

const Compoundings: React.FC = () => {
  const { data: compoundingsLP, userDataLoaded } = useCompounding();
  const cakePrice = usePriceCakeBusd();
  const { account } = useWeb3React();
  const [sortKey, setSortKey] = useState('hot');
  const [sortDir, setSortDir] = useState(ISortDir.default);
  const chosenFarmsLength = useRef(0);
  const kacPerBlock = useKacPerBlock();
  const { priceVsBusdMap } = usePrice();
  usePollCompoundingData();
  useCompoundingUserData();
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded);

  const compoundingsList = useCallback(
    (compoundingsToDisplay: ICompounding[]): ICompounding[] => {
      const compoundingsToDisplayWithAPR: ICompounding[] = compoundingsToDisplay.map((compounding) => {
        const { farm } = compounding;
        // if (!farm.lpTotalInQuoteToken) {
        //   return compounding;
        // }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(
          priceVsBusdMap[farm.quoteToken.toLocaleLowerCase()],
        );

        const { kacRewardsApr, lpRewardsApr, kacRewardApy } = getFarmApr(
          kacPerBlock,
          new BigNumber(farm.poolWeight),
          cakePrice,
          totalLiquidity,
          farm.lpAddresses,
        );
        // console.log(
        //   `${compounding.token.symbol}-${compounding.token1Address.symbol}`,
        //   'kacPerBlock',
        //   kacPerBlock.toFixed(5),
        //   'cakePrice',
        //   cakePrice.toFixed(5),
        //   'totalLiquidity',
        //   totalLiquidity.toFixed(5),
        //   'apr',
        //   cakeRewardsApr,
        //   'lpRewardsApr',
        //   lpRewardsApr,
        // );
        return {
          ...compounding,
          compounding: {
            ...compounding.compounding,
          },
          farm: {
            ...compounding.farm,
            apr: `${kacRewardsApr}`,
            lpRewardsApr: `${lpRewardsApr}`,
            liquidity: totalLiquidity.toString(),
            apy: `${kacRewardApy}`,
          },
        };
      });

      return compoundingsToDisplayWithAPR;
    },
    [cakePrice, priceVsBusdMap, kacPerBlock],
  );

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = [];

    const sortFarms = (compoundings: ICompounding[]): ICompounding[] => {
      const side = sortDir === ISortDir.default || sortDir === ISortDir.down ? 'desc' : 'asc';
      switch (sortKey) {
        case 'apy':
          return orderBy(
            compoundings,
            (compounding: ICompounding) => compounding.farm.apr + compounding.farm.lpRewardsApr,
            side,
          );
        case 'multiplier':
          return orderBy(
            compoundings,
            (compounding: ICompounding) =>
              compounding.farm.multiplier ? Number(compounding.farm.multiplier.slice(0, -1)) : 0,
            side,
          );
        case 'earned':
          return orderBy(
            compoundings,
            (compounding: ICompounding) =>
              compounding.farm.userData ? Number(compounding.farm.userData.pendingReward) : 0,
            side,
          );
        case 'liquidity':
          return orderBy(compoundings, (compounding: ICompounding) => Number(compounding.farm.liquidity), side);
        default:
          return compoundings;
      }
    };

    chosenFarms = compoundingsList(compoundingsLP);
    return sortFarms(chosenFarms);
  }, [sortKey, compoundingsLP, compoundingsList, sortDir]);

  chosenFarmsLength.current = chosenFarmsMemoized.length;

  const rowData = chosenFarmsMemoized.map((compounding: ICompounding) => {
    const {
      compounding: { token0Address, token1Address },
    } = compounding;
    //WAIT
    const row: RowProps = {
      apr: {
        apy: getDisplayApy(Number(compounding.farm.apy)),
        apr: getDisplayApr(Number(compounding.farm.apr), Number(compounding.farm.lpRewardsApr)),
        multiplier: compounding.farm.multiplier,
        compoundingSymbol: compounding.compounding.symbol,
        lpLabel: compounding.lpSymbol,
        token0Address,
        token1Address,
        cakePrice,
        originalValue: Number(compounding.farm.apy),
        fromSource: compounding.fromSource,
      },
      compounding: {
        label: compounding.lpSymbol,
        token0Address: token0Address,
        token1Address: token1Address,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(compounding?.farm?.userData?.pendingReward ?? '0')),
        pid: compounding.farm.pid,
      },
      liquidity: {
        liquidity: compounding.compounding.liquidity,
      },
      net: {
        net: '333',
      },
      multiplier: {
        multiplier: compounding.farm.multiplier,
      },
      details: compounding,
    };

    return row;
  });
  const handleSortKeyChange = (option: OptionProps): void => {
    if (option.side === ISortDir.default) {
      setSortKey('hot');
    } else {
      setSortKey(option.value);
    }
    setSortDir(option.side);
  };
  const renderContent = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema;
    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'compounding':
            return b.id - a.id;
          case 'apr':
            if (a.original.apr.apr && b.original.apr.apr) {
              return Number(a.original.apr.apr) - Number(b.original.apr.apr);
            }
            return 0;
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings;
          default:
            return 1;
        }
      },
      sortable: column.sortable,
    }));
    return (
      <CompoundingTable
        onOptionChange={handleSortKeyChange}
        data={rowData}
        sortKey={sortKey}
        sortDir={sortDir}
        columns={columns}
        userDataReady={userDataReady}
      />
    );
  };
  return (
    <Page>
      {renderContent()}
      {!rowData.length ? <PageLoader /> : null}
    </Page>
  );
};

export default Compoundings;
