import React, { FC, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { IMenu } from '../config';
import { Flex, useTooltip } from '@my/ui';
import CollapseSvg from '../imgs/collapse';
import IsoContent from './IsoContent';
import MoreContent from './MoreContent';
import IconLink from 'components/svg/IconLink';
const BigNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const { pathname } = useLocation();
  const {
    targetRef: IsoTargetRef,
    tooltip: IsoTooltip,
    tooltipVisible: IsoTooltipVisible,
    setTooltipVisible: IsoSetTooltipVisible,
  } = useTooltip(IsoContent, {
    trigger: 'hover',
    tootipStyle: { padding: '30px 30px 20px', backgroundColor: '#030222', maxWidth: '748px' },
    placement: 'top-end',
    hideArrow: false,
    tooltipOffset: [20, 10],
    arrowBackground: '#030222',
  });
  const setMoreTooltipVisible = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
  const {
    tooltip: MoreTooltip,
    tooltipVisible: MoreTooltipVisible,
    setTooltipVisible,
  } = useTooltip(
    <>
      <MoreContent setTooltipVisible={setMoreTooltipVisible.current} />
    </>,
    {
      trigger: 'hover',
      tootipStyle: { padding: '0', minWidth: '620px' },
      placement: 'top-end',
      hideArrow: false,
      tooltipOffset: [100, 10],
    },
  );
  const { tooltip: BorrowTooltip, tooltipVisible: BorrowTooltipVisible } = useTooltip('Comming Soon', {
    placement: 'right-start',
    trigger: 'hover',
    tootipStyle: {
      padding: '0 14px',
      backgroundImage: 'linear-gradient(270deg, #FC00FF 0%, #7D49FF 100%)',
      borderRadius: '12px',
      fontSize: '10px',
      lineHeight: '24px',
      border: 'none',
      fontWeight: 'bold',
    },
    hideArrow: true,
  });
  useEffect(() => {
    setMoreTooltipVisible.current = setTooltipVisible;
  }, [setTooltipVisible]);
  return useMemo(
    () => (
      <div
        onClick={() => {
          if (IsoTooltipVisible) {
            IsoSetTooltipVisible(false);
          }
        }}
      >
        {/* {IsoTooltip} */}
        {IsoTooltipVisible && IsoTooltip}
        {MoreTooltipVisible && MoreTooltip}
        {BorrowTooltipVisible && BorrowTooltip}
        <NavWrap>
          {menuItems.map((item: IMenu, index) => (
            <NavLink
              to={item.link}
              key={index}
              ref={item.text === 'ISO' ? IsoTargetRef : undefined}
              onClick={() => {
                if (item.link.indexOf('https://') > -1) {
                  window.open(item.link);
                  return;
                }
              }}
              active={
                (
                  item.link === '/'
                    ? pathname === item.link
                    : ['/add', '/remove', '/liquidity'].find((p) => pathname.startsWith(p))
                    ? item.link === '/swap'
                    : ['/nft/pools', '/nft/wallet/mint', '/nft/wallet/burn'].find((p) => pathname.startsWith(p))
                    ? item.link === '/nft/pools/'
                    : ['/stake', '/unbind', '/unstake'].find((p) => pathname.startsWith(p))
                    ? item.link === '/stake'
                    : pathname.startsWith(item.link)
                )
                  ? 't'
                  : 'f'
              }
            >
              {item.text}
              {item.children?.length && <CollapseSvg />}
            </NavLink>
          ))}
          {/* <IconMoreStyle ref={MoreTargetRef}>
          <IconMore />
        </IconMoreStyle> */}
          {/* <NavLinkA href="https://cbridge.celer.network/#/transfer" target="_blank" rel="noreferrer" title="">
          Bridge
          <IconLink />
        </NavLinkA> */}
          <NavLinkA href="https://portal.astar.network/#/balance/wallet" target="_blank" rel="noreferrer" title="">
            Faucet
            <IconLink />
          </NavLinkA>
          <NavLinkA href="https://co-go.gitbook.io/avault/" target="_blank" rel="noreferrer" title="">
            Doc
            <IconLink />
          </NavLinkA>
        </NavWrap>
      </div>
    ),
    [
      IsoSetTooltipVisible,
      IsoTooltipVisible,
      BorrowTooltip,
      BorrowTooltipVisible,
      IsoTargetRef,
      IsoTooltip,
      MoreTooltip,
      MoreTooltipVisible,
      menuItems,
      pathname,
    ],
  );
};

const NavWrap = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
  a:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
      transform: rotateZ(180deg);
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  height: 40px;
  transition: all 0.3s ease;
  // font-weight: 600;
  margin-right: 34px;
  svg {
    width: 24px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? 'rotateZ(180deg)' : '')};
  }
`;

const NavLinkA = styled.a`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubtle};
  height: 40px;
  transition: all 0.3s ease;
  // font-weight: 600;
  margin-right: 34px;
  img {
    width: 20px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    svg {
      fill: ${({ theme }) => theme.colors.text};
      transform: rotateZ(180deg);
      path {
        stroke: #fff;
      }
    }
  }
`;

export default BigNav;
