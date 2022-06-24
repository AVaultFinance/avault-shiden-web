import IconMyWallet from './imgs/iconMyWallet';

export interface IMenu {
  text: string;
  link?: string;
  collapsed?: boolean;
  children?: IMenuDetail[] | undefined;
}
export interface IMenuDetail {
  text: string;
  link: string;
  img: any;
  detail: string;
}
export const ISOPathConfig: IMenuDetail[] = [
  {
    text: 'AVault',
    img: '/images/logo_small_beta.svg',
    link: '/iso/avault',
    detail: 'The Best Yield Aggregator on Astar Network',
  },
];
export const MorePathConfig: IMenuDetail[] = [
  {
    text: 'Receive NFT in Galaxy',
    img: IconMyWallet,
    link: 'https://galaxy.eco/KACO',
    detail: 'All KACO NFT works can be freely traded on the Galaxy platform at the same time',
  },
];
const avaultMenuItems: IMenu[] = [
  {
    text: 'Vault',
    link: '/vault',
  },
  {
    text: 'Zap',
    link: '/zap',
  },
  {
    text: 'Farm',
    link: '/farms',
  },
  {
    text: 'Governance',
    link: '/governance',
  },
  {
    text: 'ISO',
    collapsed: true,
    link: '#',
    children: ISOPathConfig,
  },
  // {
  //   text: 'ISO',
  //   link: '/iso',
  // },
  // {
  //   text: 'Stake',
  //   link: '/stake',
  // },
];
export const menuItemsDefault = avaultMenuItems;
