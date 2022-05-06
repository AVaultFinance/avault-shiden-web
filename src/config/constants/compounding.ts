import { ChainId, CHAINKEY } from '@avault/sdk';
import { chainKey } from 'config';
import { IFarmProject, IABIType, ICompoundingConfigItem } from 'state/compounding/types';
const compounding: ICompoundingConfigItem[] =
  chainKey === CHAINKEY.SDN
    ? [
        {
          lpSymbol: 'KAC-WSDN LP',
          contractAddress: {
            [ChainId.SDN_TESTNET]: '0x12119c66F58585E9C9371c75c5ca365eeD41b0A3',
            [ChainId.SDN_MAINNET]: '0x12119c66F58585E9C9371c75c5ca365eeD41b0A3',
          },
          fromSource: IFarmProject.kaco, // from which swap
          abiType: IABIType.AVaultPCS, // use which abi
          swapLink: 'https://shiden.kaco.finance/add/SDN/0xb12c13e66AdE1F72f71834f2FC5082Db8C091358',
        },
      ]
    : [];

export default compounding;
