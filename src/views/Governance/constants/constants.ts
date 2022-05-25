// https://github.com/AVaultFinance/avault-contractsV2/tree/main/contracts/governance

import { ChainId, Token } from '@my/sdk';
import { chainId } from 'config/constants/tokens';
import { IGrassHouse } from '../state/governance/types';

// createLock  创建新锁仓
// increaseLockAmount 增加锁仓金额
// increaseUnlockTime 增加锁仓时间
// withdraw 到期提现
const _veAVAT: { [chainId: number]: Token } = {
  [ChainId.SDN_MAINNET]: new Token(
    ChainId.SDN_MAINNET as any,
    '0x1222d4e455c058A3e30dC5e81E0E2d90ac43c775',
    18,
    'veAVAT',
    'vote escrow AVAT',
  ),
};
// const CI3 = await ethers.getContractAt("GrassHouse", grassHouse, officialUser);
// const r3 = await CI3.callStatic.claim(officialAccount);
// GrassHouse.rewardToken().name()
const grassHouse01: IGrassHouse = {
  address: '0x94739452bcC6f99e7109387631d016aafa764138',
  token: null,
};
export const veAVAT = _veAVAT[chainId];
export const grassHouseListConfig: IGrassHouse[] = [grassHouse01];
// claim 获取奖励
