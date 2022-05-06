import masterchefABI from 'config/abi/masterchef.json';
import masterchefSdnABI from 'config/abi/masterchef_Shiden.json';
import { chainId } from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';
import multicall from 'utils/multicall';
import { ICompounding, ICompoundingConfigItem } from './types';
import AVaultPCS_ABI from 'config/abi/AVaultPCS_ABI.json';
import erc20 from 'config/abi/erc20.json';
import { BIG_TEN, BIG_ZERO } from 'utils/bigNumber';
import { chainKey } from 'config';
import { CHAINKEY } from '@avault/sdk';
import BigNumber from 'bignumber.js';
import { getBalanceAmount } from 'utils/formatBalance';

const fetchCompounding = async (
  compounding: ICompoundingConfigItem,
  priceVsBusdMap: Record<string, string>,
): Promise<ICompounding> => {
  const compoundingPublicData = await fetch(compounding, priceVsBusdMap);
  return { ...compounding, ...compoundingPublicData };
};
const fetch = async (
  compounding: ICompoundingConfigItem,
  priceVsBusdMap: Record<string, string>,
): Promise<ICompounding> => {
  const AVaultPCS = getAddress(compounding.contractAddress[chainId]);
  const {
    masterChef,
    name,
    symbol,
    pid,
    wantAddress,
    token0Address,
    token1Address,
    earnedAddress,
    AVAAddress,
    wantLockedTotal,
    compoundingTotalSupply,
    compoundingDecimals,
  } = await fetchCompoundingABI(AVaultPCS);

  const { lpAddresses, poolWeight, multiplier } = await fetchMasterChefABI(masterChef, pid);

  const {
    tokenAmountMc,
    tokenAmountTotal,
    quoteTokenAmountMc,
    quoteTokenAmountTotal,
    lpTotalSupply,
    lpTotalInQuoteToken,
    tokenPriceVsQuote,
    lpSymbol,
    quoteTokenDecimals,
    liquidity,
    lpTokenPrice,
  } = await fetchFarmDataABI(masterChef, lpAddresses, token0Address, token1Address, priceVsBusdMap);
  const lpToCLpRate =
    wantLockedTotal && compoundingTotalSupply && wantLockedTotal > 0 && compoundingTotalSupply > 0
      ? (Number(wantLockedTotal) / Number(compoundingTotalSupply)).toFixed(4)
      : '1.0000';
  return {
    ...compounding,
    compounding: {
      symbol: symbol,
      name: name,
      masterChef: masterChef,
      token0Address: token0Address,
      token1Address: token1Address,
      fromSource: compounding.fromSource,
      wantAddress: wantAddress,
      earnedAddress: earnedAddress,
      wantLockedTotal: wantLockedTotal,
      totalSupply: compoundingTotalSupply,
      AVAAddress: AVAAddress,
      decimals: compoundingDecimals,
      lpToCLpRate: lpToCLpRate,
    },
    farm: {
      pid: pid,
      lpSymbol: lpSymbol,
      lpAddresses: lpAddresses,
      token: token0Address,
      quoteToken: token1Address,
      tokenAmountMc: tokenAmountMc,
      quoteTokenAmountMc: quoteTokenAmountMc,
      tokenAmountTotal: tokenAmountTotal,
      quoteTokenAmountTotal: quoteTokenAmountTotal,
      lpTotalInQuoteToken: lpTotalInQuoteToken,
      lpTotalSupply: lpTotalSupply,
      tokenPriceVsQuote: tokenPriceVsQuote,
      poolWeight: poolWeight.toString(),
      multiplier: multiplier,
      quoteTokenDecimals: quoteTokenDecimals,
      liquidity: liquidity,
      lpTokenPrice: lpTokenPrice,
      userData: {
        allowance: '0',
        stakingTokenBalance: '0',
        stakedBalance: '0',
        pendingReward: '0',
        avaultAddressBalance: '0',
      },
    },
  };
};
const fetchCompoundingABI = async (AVaultPCSAddress: string) => {
  const calls = [
    {
      address: AVaultPCSAddress,
      name: 'farmContractAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'name',
    },
    {
      address: AVaultPCSAddress,
      name: 'symbol',
    },

    {
      address: AVaultPCSAddress,
      name: 'pid',
    },
    {
      address: AVaultPCSAddress,
      name: 'wantAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'token0Address',
    },
    {
      address: AVaultPCSAddress,
      name: 'token1Address',
    },
    {
      address: AVaultPCSAddress,
      name: 'earnedAddress',
    },

    // {
    //   address: AVaultPCS,
    //   name: 'wethAddress',
    // },
    {
      address: AVaultPCSAddress,
      name: 'AVAAddress',
    },
    {
      address: AVaultPCSAddress,
      name: 'wantLockedTotal',
    },
    {
      address: AVaultPCSAddress,
      name: 'totalSupply',
    },
    // Quote token decimals
    {
      address: AVaultPCSAddress,
      name: 'decimals',
    },
  ];
  const [
    _masterChef,
    _name,
    _symbol,
    _pid,
    _wantAddress,
    _token0Address,
    _token1Address,
    _earnedAddress,
    _AVAAddress,
    _wantLockedTotal,
    _compoundingTotalSupply,
    _compoundingDecimals,
  ] = await multicall(AVaultPCS_ABI, calls);
  return {
    masterChef: _masterChef ? _masterChef[0] : null,
    name: _name ? _name[0] : null,
    symbol: _symbol ? _symbol[0] : null,
    pid: _pid ? _pid[0].toNumber() : null,
    wantAddress: _wantAddress ? _wantAddress[0] : null,
    token0Address: _token0Address ? _token0Address[0] : null,
    token1Address: _token1Address ? _token1Address[0] : null,
    earnedAddress: _earnedAddress ? _earnedAddress[0] : null,
    AVAAddress: _AVAAddress ? _AVAAddress[0] : null,
    wantLockedTotal: _wantLockedTotal ? _wantLockedTotal[0].toString() : null,
    compoundingTotalSupply: _compoundingTotalSupply ? _compoundingTotalSupply[0].toString() : null,
    compoundingDecimals: _compoundingDecimals ? _compoundingDecimals[0].toString() : null,
  };
};
const fetchMasterChefABI = async (masterChefAddress: string, pid: number) => {
  const _masterchefABI = chainKey === CHAINKEY.SDN ? masterchefSdnABI : masterchefABI;
  // info: [
  //   lpToken (address) : 0x456c0082de0048ee883881ff61341177fa1fef40
  //   allocPoint (uint256) : 2000
  //   lastRewardBlock (uint256) : 1296996
  //   accKacPerShare (uint256) : 349319463345545
  // ]
  const [info, totalAllocPoint] =
    pid || pid === 0
      ? await multicall(_masterchefABI, [
          {
            address: masterChefAddress,
            name: 'poolInfo',
            params: [pid],
          },
          {
            address: masterChefAddress,
            name: 'totalAllocPoint',
          },
        ])
      : [null, null];
  const allocPoint = info ? new BigNumber(info.allocPoint?._hex) : BIG_ZERO;
  const lpAddresses = info ? info.lpToken : '';
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : BIG_ZERO;
  return {
    lpAddresses,
    poolWeight,
    multiplier: `${allocPoint.div(new BigNumber(100)).toString()}X`,
  };
};
const fetchFarmDataABI = async (
  masterChefAddress: string,
  lpAddress: string,
  token: string,
  quoteToken: string,
  priceVsBusdMap: Record<string, string>,
) => {
  const calls = [
    {
      address: token,
      name: 'balanceOf',
      params: [lpAddress],
    },
    {
      address: quoteToken,
      name: 'balanceOf',
      params: [lpAddress],
    },
    {
      address: lpAddress,
      name: 'balanceOf',
      params: [masterChefAddress],
    },
    {
      address: lpAddress,
      name: 'totalSupply',
    },
    {
      address: token,
      name: 'decimals',
    },
    {
      address: quoteToken,
      name: 'decimals',
    },
    {
      address: lpAddress,
      name: 'symbol',
    },
  ];
  const [
    tokenBalanceLP,
    quoteTokenBalanceLp,
    lpTokenBalanceMC,
    lpTotalSupply,
    tokenDecimals,
    quoteTokenDecimals,
    lpSymbol,
  ] = await multicall(erc20, calls);
  // const {
  //   tokenBalanceLP,
  //   quoteTokenBalanceLp,
  //   lpTokenBalanceMC,
  //   lpTotalSupply,
  //   tokenDecimals,
  //   quoteTokenDecimals,
  //   lpSymbol,
  // } = {
  //   tokenBalanceLP: _tokenBalanceLP ? _tokenBalanceLP[0] : null,
  //   quoteTokenBalanceLp: _quoteTokenBalanceLp ? _quoteTokenBalanceLp[0] : null,
  //   lpTokenBalanceMC: _lpTokenBalanceMC ? _lpTokenBalanceMC[0] : null,
  //   lpTotalSupply: _lpTotalSupply ? _lpTotalSupply[0] : null,
  //   tokenDecimals: _tokenDecimals ? _tokenDecimals[0] : null,
  //   quoteTokenDecimals: _quoteTokenDecimals ? _quoteTokenDecimals[0] : null,
  //   lpSymbol: _lpSymbol ? _lpSymbol[0] : null,
  // };
  // div 除法   times 乘法
  const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply));
  // token balance
  const tokenAmountTotal = new BigNumber(tokenBalanceLP).div(BIG_TEN.pow(tokenDecimals));
  // quote token balance
  const quoteTokenAmountTotal = new BigNumber(quoteTokenBalanceLp).div(BIG_TEN.pow(quoteTokenDecimals));
  //
  const tokenAmountMc = tokenAmountTotal.times(lpTokenRatio);
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lpTokenRatio);
  // 在LP中的总质押，以报价代币价值计算
  const lpTotalInQuoteToken = quoteTokenAmountMc.times(new BigNumber(2));
  const totalLiquidity = priceVsBusdMap[quoteToken.toLocaleLowerCase()]
    ? lpTotalInQuoteToken.times(priceVsBusdMap[quoteToken.toLocaleLowerCase()] ?? 1).toString()
    : '';

  let lpTokenPrice = BIG_ZERO;
  if (lpTotalSupply && lpTotalInQuoteToken && priceVsBusdMap[token.toLocaleLowerCase()]) {
    const farmTokenPriceInUsd = priceVsBusdMap[token.toLocaleLowerCase()];
    const valueOfBaseTokenInFarm = new BigNumber(farmTokenPriceInUsd).times(tokenAmountTotal);
    const overallValueOfAllTokensInFarm = valueOfBaseTokenInFarm.times(2);
    const totalLpTokens = getBalanceAmount(new BigNumber(lpTotalSupply));
    lpTokenPrice = overallValueOfAllTokensInFarm.div(totalLpTokens);
  }

  return {
    tokenAmountMc: tokenAmountMc.toString(),
    tokenAmountTotal: tokenAmountTotal.toString(),
    quoteTokenAmountMc: quoteTokenAmountMc.toString(),
    quoteTokenAmountTotal: quoteTokenAmountTotal.toString(),
    lpTotalSupply: lpTotalSupply.toString(),
    lpTotalInQuoteToken: lpTotalInQuoteToken.toString(),
    liquidity: totalLiquidity,
    tokenPriceVsQuote: quoteTokenAmountTotal.div(tokenAmountTotal).toString(),
    lpSymbol: lpSymbol ? lpSymbol[0] : '',
    quoteTokenDecimals: quoteTokenDecimals ? quoteTokenDecimals[0] : 18,
    lpTokenPrice: lpTokenPrice.toString(),
  };
};
export default fetchCompounding;
