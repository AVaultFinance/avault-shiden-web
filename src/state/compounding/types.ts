import { ChainId } from '@avault/sdk';
import BigNumber from 'bignumber.js';
export enum IFarmProject {
  kaco = 'Kacoswap',
  starlay = 'Starlay',
  arthswap = 'Arthswap',
}
export enum ISwapLink {
  kaco = 'https://shiden.kaco.finance',
  starlay = 'https://starlay.finance/app',
  arthswap = 'https://app.arthswap.org/#/swap',
}

export enum IABIType {
  AVaultPCS,
}
interface IAddress {
  [ChainId.SDN_MAINNET]?: string;
  [ChainId.SDN_TESTNET]?: string;
  [ChainId.ASTR_MAINNET]?: string;
  [ChainId.ASTR_TESTNET]?: string;
  [ChainId.BSC_MAINNET]?: string;
  [ChainId.BSC_TESTNET]?: string;
}
export interface ICompoundingConfigItem {
  contractAddress: IAddress;
  fromSource: IFarmProject;
  abiType: IABIType;
  swapLink: string;
  lpSymbol: string;
}
export interface ICompoundingFarm {
  // abi
  pid: number;
  lpSymbol: string;
  lpAddresses: string;
  tokenAmountMc: string;
  token: string;
  quoteToken: string;
  quoteTokenAmountMc: string;
  tokenAmountTotal: string;
  quoteTokenAmountTotal: string;
  lpTotalInQuoteToken: string;
  lpTotalSupply: string;
  tokenPriceVsQuote: string;
  poolWeight: string;
  multiplier: string;
  quoteTokenDecimals: number;
  // calculate
  apr?: string;
  apy?: string;
  lpRewardsApr?: string;
  liquidity?: string;
  lpTokenPrice?: string;
  userData?: ICompoundingUserData;
}
export interface ICompoundingUserData {
  pid?: number;
  allowance: string;
  stakingTokenBalance: string;
  stakedBalance: string;
  pendingReward: string;
  avaultAddressBalance: string;
}
export interface ICompoundingComp {
  // abi
  symbol: string;
  name: string;
  masterChef: string;
  AVAAddress: string;
  token0Address: string;
  token1Address: string;
  fromSource: IFarmProject;
  wantAddress: string;
  earnedAddress: string;
  wantLockedTotal: string;
  totalSupply: string;
  decimals: number;
  balance?: string;
  liquidity?: string;
  // calculate
  lpToCLpRate?: string;
}
export interface ICompounding {
  contractAddress: IAddress;
  fromSource: IFarmProject;
  abiType: IABIType;
  swapLink: string;
  lpSymbol: string;
  compounding: ICompoundingComp;
  farm: ICompoundingFarm;
}
// BTC   ETH  USDC  ASTR
export const compoundingData = [
  {
    id: 1,
    selected: false,
    hidden: false,
    original: {
      compounding: {
        label: 'USDT-USDC LP',
        token0Address: '0x55d398326f99059ff775485246999027b3197955',
        token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        isSingle: false,
        farmProject: IFarmProject.arthswap,
        swapLink: ISwapLink.arthswap,
      },
      net: { net: '333' },
      liquidity: { liquidity: '0.00' },
      apr: {
        farmProject: IFarmProject.arthswap,
        apy: '10.02',
        apr: '63.5',
        multiplier: '20X',
        compoundingSymbol: 'AAUU',
        lpLabel: 'USDT-USDC LP',
        token0Address: '0x55d398326f99059ff775485246999027b3197955',
        token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        cakePrice: new BigNumber('0.0296'),
        originalValue: 10.020219078151138,
        fromSource: IFarmProject.arthswap,
      },
      earned: { earnings: 0, pid: 1 },
      multiplier: { multiplier: '20X' },
      details: {
        lpSymbol: 'USDT-USDC LP',

        contractAddress: {
          '82': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
          '336': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
        },
        fromSource: IFarmProject.arthswap,
        swapLink: ISwapLink.arthswap,
        abiType: 0,
        compounding: {
          symbol: 'AAUU',
          name: 'Avault Kaco KAC-WSDN LP',
          masterChef: '0x293A7824582C56B0842535f94F6E3841888168C8',
          token0Address: '0x55d398326f99059ff775485246999027b3197955',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          fromSource: IFarmProject.arthswap,
          swapLink: ISwapLink.arthswap,
          wantAddress: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          earnedAddress: '0x55d398326f99059ff775485246999027b3197955',
          wantLockedTotal: '110390420000000',
          totalSupply: '110000000000000',
          AVAAddress: '0x55d398326f99059ff775485246999027b3197955',
          decimals: 18,
          lpToCLpRate: '1.0000',
          liquidity: '0.00',
        },
        farm: {
          pid: 1,
          lpSymbol: 'USDT-USDC LP',
          lpAddresses: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          token: '0x55d398326f99059ff775485246999027b3197955',
          quoteToken: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          tokenAmountMc:
            '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
          quoteTokenAmountMc:
            '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
          tokenAmountTotal: '472733.801506738136252855',
          quoteTokenAmountTotal: '20708.797818239259072963',
          lpTotalInQuoteToken:
            '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
          lpTotalSupply: '98176461450833208727334',
          tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
          poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
          multiplier: '20X',
          quoteTokenDecimals: 18,
          liquidity: '28015.52611672134',
          lpTokenPrice: '0.28505652613293882452117588446169683262071264798495095077236909192679546370616882',
          userData: {
            allowance: '0',
            stakingTokenBalance: '0',
            stakedBalance: '0',
            pendingReward: '0',
            avaultAddressBalance: '0',
          },
          apr: '63.50215608181524',
          lpRewardsApr: '0',
          apy: '10.020219078151138',
        },
      },
    },
    cells: [
      {
        hidden: false,
        field: 'compounding',
        value: {
          label: 'USDT-USDC LP',
          token0Address: '0x55d398326f99059ff775485246999027b3197955',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
      },
      { hidden: false, field: 'net', value: { net: '333' } },
      { hidden: false, field: 'liquidity', value: { liquidity: '0.00' } },
      {
        hidden: false,
        field: 'apr',
        value: {
          apy: '10.02',
          apr: '63.5',
          multiplier: '20X',
          compoundingSymbol: 'AAUU',
          lpLabel: 'USDT-USDC LP',
          token0Address: '0x55d398326f99059ff775485246999027b3197955',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          cakePrice: '0.0296',
          originalValue: 10.020219078151138,
        },
      },
      { hidden: false, field: 'earned', value: { earnings: 0, pid: 1 } },
      { hidden: false, field: 'multiplier', value: { multiplier: '20X' } },
      {
        hidden: false,
        field: 'details',
        value: {
          contractAddress: {
            '82': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
            '336': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
          },
          fromSource: IFarmProject.arthswap,
          abiType: 0,
          compounding: {
            symbol: 'AAUU',
            name: 'Avault Kaco KAC-WSDN LP',
            masterChef: '0x293A7824582C56B0842535f94F6E3841888168C8',
            token0Address: '0x55d398326f99059ff775485246999027b3197955',
            token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            fromSource: IFarmProject.arthswap,
            swapLink: ISwapLink.arthswap,

            wantAddress: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
            earnedAddress: '0x55d398326f99059ff775485246999027b3197955',
            wantLockedTotal: '110390420000000',
            totalSupply: '110000000000000',
            AVAAddress: '0x55d398326f99059ff775485246999027b3197955',
            decimals: '18',
            lpToCLpRate: '1.0122',
            liquidity: '0.00',
          },
          farm: {
            pid: 1,
            lpSymbol: 'USDT-USDC LP',
            lpAddresses: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
            token: '0x55d398326f99059ff775485246999027b3197955',
            quoteToken: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            tokenAmountMc:
              '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
            quoteTokenAmountMc:
              '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
            tokenAmountTotal: '472733.801506738136252855',
            quoteTokenAmountTotal: '20708.797818239259072963',
            lpTotalInQuoteToken:
              '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
            lpTotalSupply: '98176461450833208727334',
            tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
            poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
            multiplier: '20X',
            quoteTokenDecimals: 18,
            liquidity: '28015.52611672134',
            lpTokenPrice: '0.28505652613293882452117588446169683262071264798495095077236909192679546370616882',
            userData: {
              allowance: '0',
              stakingTokenBalance: '0',
              stakedBalance: '0',
              pendingReward: '0',
              avaultAddressBalance: '0',
            },
            apr: '63.50215608181524',
            lpRewardsApr: '0',
            apy: '10.020219078151138',
          },
        },
      },
    ],
  },

  {
    id: 3,
    selected: false,
    hidden: false,
    original: {
      compounding: {
        label: 'USDC',
        token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        isSingle: true,
        farmProject: IFarmProject.starlay,
        swapLink: ISwapLink.starlay,
      },
      net: { net: '333' },
      liquidity: { liquidity: '0.00' },
      apr: {
        apy: '8.91',
        apr: '63.5',
        multiplier: '20X',
        compoundingSymbol: 'AUSDC',
        fromSource: IFarmProject.starlay,
        lpLabel: 'USDC',
        token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        cakePrice: new BigNumber('0.0296'),
        originalValue: 8.910219078151138,
      },
      earned: { earnings: 0, pid: 1 },
      multiplier: { multiplier: '20X' },
      details: {
        contractAddress: {
          '82': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
          '336': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
        },
        lpSymbol: 'USDC',
        fromSource: IFarmProject.starlay,
        swapLink: ISwapLink.starlay,
        abiType: 0,
        compounding: {
          symbol: 'AUSDC',
          name: 'Avault Kaco KAC-WSDN LP',
          masterChef: '0x293A7824582C56B0842535f94F6E3841888168C8',
          token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          fromSource: IFarmProject.starlay,
          swapLink: ISwapLink.starlay,
          wantAddress: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          earnedAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          wantLockedTotal: '110390420000000',
          totalSupply: '110000000000000',
          AVAAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          decimals: 18,
          lpToCLpRate: '1.0000',
          liquidity: '0.00',
        },
        farm: {
          pid: 1,
          lpSymbol: 'USDC',
          lpAddresses: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          token: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          quoteToken: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          tokenAmountMc:
            '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
          quoteTokenAmountMc:
            '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
          tokenAmountTotal: '472733.801506738136252855',
          quoteTokenAmountTotal: '20708.797818239259072963',
          lpTotalInQuoteToken:
            '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
          lpTotalSupply: '98176461450833208727334',
          tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
          poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
          multiplier: '20X',
          quoteTokenDecimals: 18,
          liquidity: '28015.52611672134',
          lpTokenPrice: '0.28505652613293882452117588446169683262071264798495095077236909192679546370616882',
          userData: {
            allowance: '0',
            stakingTokenBalance: '0',
            stakedBalance: '0',
            pendingReward: '0',
            avaultAddressBalance: '0',
          },
          apr: '63.50215608181524',
          lpRewardsApr: '0',
          apy: '8.910219078151138',
        },
      },
    },
    cells: [
      {
        hidden: false,
        field: 'compounding',
        value: {
          label: 'USDC',
          token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        },
      },
      { hidden: false, field: 'net', value: { net: '333' } },
      { hidden: false, field: 'liquidity', value: { liquidity: '0.00' } },
      {
        hidden: false,
        field: 'apr',
        value: {
          apy: '8.91',
          apr: '63.5',
          multiplier: '20X',
          compoundingSymbol: 'AUSDC',
          lpLabel: 'USDC',
          token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
          token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          cakePrice: '0.0296',
          originalValue: 8.910219078151138,
        },
      },
      { hidden: false, field: 'earned', value: { earnings: 0, pid: 1 } },
      { hidden: false, field: 'multiplier', value: { multiplier: '20X' } },
      {
        hidden: false,
        field: 'details',
        value: {
          contractAddress: {
            '82': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
            '336': '0xFB6Ae2A33e95C21d06A583D762BAfEC0F4967403',
          },
          fromSource: IFarmProject.starlay,
          swapLink: ISwapLink.starlay,
          abiType: 0,
          compounding: {
            symbol: 'AUSDC',
            name: 'Avault Kaco KAC-WSDN LP',
            masterChef: '0x293A7824582C56B0842535f94F6E3841888168C8',
            token0Address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            token1Address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            fromSource: IFarmProject.starlay,
            swapLink: ISwapLink.starlay,
            wantAddress: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
            earnedAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            wantLockedTotal: '110390420000000',
            totalSupply: '110000000000000',
            AVAAddress: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            decimals: '18',
            lpToCLpRate: '1.0000',
            liquidity: '0.00',
          },
          farm: {
            pid: 1,
            lpSymbol: 'USDC',
            lpAddresses: '0x456C0082DE0048EE883881fF61341177FA1FEF40',
            token: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            quoteToken: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
            tokenAmountMc:
              '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
            quoteTokenAmountMc:
              '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
            tokenAmountTotal: '472733.801506738136252855',
            quoteTokenAmountTotal: '20708.797818239259072963',
            lpTotalInQuoteToken:
              '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
            lpTotalSupply: '98176461450833208727334',
            tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
            poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
            multiplier: '20X',
            quoteTokenDecimals: 18,
            liquidity: new BigNumber('28015.52611672134'),
            lpTokenPrice: '0.28505652613293882452117588446169683262071264798495095077236909192679546370616882',
            userData: {
              allowance: '0',
              stakingTokenBalance: '0',
              stakedBalance: '0',
              pendingReward: '0',
              avaultAddressBalance: '0',
            },
            apr: '63.50215608181524',
            lpRewardsApr: '0',
            apy: '8.910219078151138',
          },
        },
      },
    ],
  },
];

export const farmData = [
  {
    id: 1,
    selected: false,
    hidden: false,
    original: {
      farm: {
        label: 'AAUU',
        pid: 1,
        token: {
          symbol: 'AVA',
          address: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          decimals: 18,
          projectLink: 'https://kaco.finance/',
          busdPrice: '0.0296',
        },
        quoteToken: {
          symbol: 'WSDN',
          name: 'Wrapped SDN',
          decimals: 18,
          address: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          projectLink: 'https://blockscout.com/shiden/',
          busdPrice: '0.6781',
        },
      },
      liquidity: {
        liquidity: new BigNumber('15.32'),
      },
      apr: {
        apy: '188.6',
        apr: '3.12',
        multiplier: '20X',
        lpLabel: 'AAUU',
        tokenAddress: {
          '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
          '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
        },
        quoteTokenAddress: {
          '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
        },
        cakePrice: new BigNumber('0.0296'),
        originalValue: 188.60219078151138,
      },
      earned: { earnings: 0, pid: 1 },
      multiplier: { multiplier: '20X' },
      details: {
        pid: 1,
        lpSymbol: 'AAUU',
        lpAddresses: {
          '82': '0x0bA819e30016Cf682C7795b44859148C65e62292',
          '336': '0x456C0082DE0048EE883881fF61341177FA1FEF40',
        },
        token: {
          symbol: 'AVA',
          address: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          decimals: 18,
          projectLink: 'https://kaco.finance/',
          busdPrice: '0.0296',
        },
        quoteToken: {
          symbol: 'WSDN',
          name: 'Wrapped SDN',
          decimals: 18,
          address: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          projectLink: 'https://blockscout.com/shiden/',
          busdPrice: '0.6781',
        },
        userData: { allowance: '0', tokenBalance: '0', stakedBalance: '0', earnings: '0' },
        tokenAmountMc:
          '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
        quoteTokenAmountMc:
          '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
        tokenAmountTotal: '472733.801506738136252855',
        quoteTokenAmountTotal: '20708.797818239259072963',
        lpTotalSupply: '98176461450833208727334',
        lpTotalInQuoteToken:
          '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
        tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
        poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
        multiplier: '20X',
        apr: 63.50215608181524,
        lpRewardsApr: 0,
        liquidity: new BigNumber('28015.52611672134'),
        apy: 188.60219078151138,
      },
    },
    cells: [
      {
        hidden: false,
        field: 'farm',
        value: {
          label: 'AAUU',
          pid: 1,
          token: {
            symbol: 'AVA',
            address: {
              '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
              '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
            },
            decimals: 18,
            projectLink: 'https://kaco.finance/',
            busdPrice: '0.0296',
          },
          quoteToken: {
            symbol: 'WSDN',
            name: 'Wrapped SDN',
            decimals: 18,
            address: {
              '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
              '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            },
            projectLink: 'https://blockscout.com/shiden/',
            busdPrice: '0.6781',
          },
        },
      },
      {
        hidden: false,
        field: 'liquidity',
        value: {
          liquidity: new BigNumber('28015.52611672134'),
        },
      },
      {
        hidden: false,
        field: 'apr',
        value: {
          apy: '188.6',
          apr: '63.5',
          multiplier: '20X',
          lpLabel: 'AAUU',
          tokenAddress: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          quoteTokenAddress: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          cakePrice: '0.0296',
          originalValue: 188.60219078151138,
        },
      },
      { hidden: false, field: 'earned', value: { earnings: 0, pid: 1 } },
      { hidden: false, field: 'multiplier', value: { multiplier: '20X' } },
      {
        hidden: false,
        field: 'details',
        value: {
          pid: 1,
          lpSymbol: 'AAUU',
          lpAddresses: {
            '82': '0x0bA819e30016Cf682C7795b44859148C65e62292',
            '336': '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          },
          token: {
            symbol: 'AVA',
            address: {
              '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
              '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
            },
            decimals: 18,
            projectLink: 'https://kaco.finance/',
            busdPrice: '0.0296',
          },
          quoteToken: {
            symbol: 'WSDN',
            name: 'Wrapped SDN',
            decimals: 18,
            address: {
              '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
              '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            },
            projectLink: 'https://blockscout.com/shiden/',
            busdPrice: '0.6781',
          },
          userData: { allowance: '0', tokenBalance: '0', stakedBalance: '0', earnings: '0' },
          tokenAmountMc:
            '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
          quoteTokenAmountMc:
            '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
          tokenAmountTotal: '472733.801506738136252855',
          quoteTokenAmountTotal: '20708.797818239259072963',
          lpTotalSupply: '98176461450833208727334',
          lpTotalInQuoteToken:
            '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
          tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
          poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
          multiplier: '20X',
          apr: 63.50215608181524,
          lpRewardsApr: 0,
          liquidity: new BigNumber('28015.52611672134'),
          apy: 188.60219078151138,
        },
      },
    ],
  },
  {
    id: 2,
    selected: false,
    hidden: false,
    original: {
      farm: {
        label: 'aAVA',
        pid: 1,
        token: {
          symbol: 'AVA',
          address: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          decimals: 18,
          projectLink: 'https://kaco.finance/',
          busdPrice: '0.0296',
        },
        quoteToken: {
          symbol: 'WSDN',
          name: 'Wrapped SDN',
          decimals: 18,
          address: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          projectLink: 'https://blockscout.com/shiden/',
          busdPrice: '0.6781',
        },
      },
      liquidity: {
        liquidity: new BigNumber('115.52'),
      },
      apr: {
        apy: '188.6',
        apr: '12.31',
        multiplier: '20X',
        lpLabel: 'AVA',
        tokenAddress: {
          '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
          '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
        },
        quoteTokenAddress: {
          '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
        },
        cakePrice: new BigNumber('0.0296'),
        originalValue: 188.60219078151138,
      },
      earned: { earnings: 0, pid: 1 },
      multiplier: { multiplier: '20X' },
      details: {
        pid: 1,
        lpSymbol: 'AVA',
        lpAddresses: {
          '82': '0x0bA819e30016Cf682C7795b44859148C65e62292',
          '336': '0x456C0082DE0048EE883881fF61341177FA1FEF40',
        },
        token: {
          symbol: 'AVA',
          address: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          decimals: 18,
          projectLink: 'https://kaco.finance/',
          busdPrice: '0.0296',
        },
        quoteToken: {
          symbol: 'WSDN',
          name: 'Wrapped SDN',
          decimals: 18,
          address: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          projectLink: 'https://blockscout.com/shiden/',
          busdPrice: '0.6781',
        },
        userData: { allowance: '0', tokenBalance: '0', stakedBalance: '0', earnings: '0' },
        tokenAmountMc:
          '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
        quoteTokenAmountMc:
          '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
        tokenAmountTotal: '472733.801506738136252855',
        quoteTokenAmountTotal: '20708.797818239259072963',
        lpTotalSupply: '98176461450833208727334',
        lpTotalInQuoteToken:
          '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
        tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
        poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
        multiplier: '20X',
        apr: 63.50215608181524,
        lpRewardsApr: 0,
        liquidity: new BigNumber('28015.52611672134'),
        apy: 188.60219078151138,
      },
    },
    cells: [
      {
        hidden: false,
        field: 'farm',
        value: {
          label: 'AVA',
          pid: 1,
          token: {
            symbol: 'AVA',
            address: {
              '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
              '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
            },
            decimals: 18,
            projectLink: 'https://kaco.finance/',
            busdPrice: '0.0296',
          },
          quoteToken: {
            symbol: 'WSDN',
            name: 'Wrapped SDN',
            decimals: 18,
            address: {
              '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
              '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            },
            projectLink: 'https://blockscout.com/shiden/',
            busdPrice: '0.6781',
          },
        },
      },
      {
        hidden: false,
        field: 'liquidity',
        value: {
          liquidity: new BigNumber('28015.52611672134'),
        },
      },
      {
        hidden: false,
        field: 'apr',
        value: {
          apy: '188.6',
          apr: '63.5',
          multiplier: '20X',
          lpLabel: 'AVA',
          tokenAddress: {
            '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
            '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
          },
          quoteTokenAddress: {
            '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
          },
          cakePrice: '0.0296',
          originalValue: 188.60219078151138,
        },
      },
      { hidden: false, field: 'earned', value: { earnings: 0, pid: 1 } },
      { hidden: false, field: 'multiplier', value: { multiplier: '20X' } },
      {
        hidden: false,
        field: 'details',
        value: {
          pid: 1,
          lpSymbol: 'AVA',
          lpAddresses: {
            '82': '0x0bA819e30016Cf682C7795b44859148C65e62292',
            '336': '0x456C0082DE0048EE883881fF61341177FA1FEF40',
          },
          token: {
            symbol: 'AVA',
            address: {
              '82': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
              '336': '0xb12c13e66ade1f72f71834f2fc5082db8c091358',
            },
            decimals: 18,
            projectLink: 'https://kaco.finance/',
            busdPrice: '0.0296',
          },
          quoteToken: {
            symbol: 'WSDN',
            name: 'Wrapped SDN',
            decimals: 18,
            address: {
              '82': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
              '336': '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
            },
            projectLink: 'https://blockscout.com/shiden/',
            busdPrice: '0.6781',
          },
          userData: { allowance: '0', tokenBalance: '0', stakedBalance: '0', earnings: '0' },
          tokenAmountMc:
            '471559.8392807465922754335585012287478156162052075807015060024359882761365621443949805082594920415051519',
          quoteTokenAmountMc:
            '20657.37068037261666224906946605307327697003681220776317494838004563472061327824254405542855963695741614',
          tokenAmountTotal: '472733.801506738136252855',
          quoteTokenAmountTotal: '20708.797818239259072963',
          lpTotalSupply: '98176461450833208727334',
          lpTotalInQuoteToken:
            '41314.74136074523332449813893210614655394007362441552634989676009126944122655648508811085711927391483228',
          tokenPriceVsQuote: '0.04380646730196652783146946639140426953535937682783101164957744370366617922314668',
          poolWeight: '0.60606060606060606060606060606060606060606060606060606060606060606060606060606061',
          multiplier: '20X',
          apr: 63.50215608181524,
          lpRewardsApr: 0,
          liquidity: new BigNumber('28015.52611672134'),
          apy: 188.60219078151138,
        },
      },
    ],
  },
];
