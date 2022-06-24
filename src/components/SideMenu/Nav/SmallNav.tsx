import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useTooltip, Flex, CloseIcon } from '@my/ui';
import { IMenu } from '../config';
import CollapseSvg from '../imgs/collapse';
import IconMenu from '../imgs/iconMenu';
import { IsoContentIn } from './IsoContent';
import WalletAccountInfo from '../UserWidget/WalletAccount';
const SmallNavTooltip: FC<{
  _menuItems: IMenu[];
  setTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ _menuItems, setTooltipVisible }) => {
  const { pathname } = useLocation();
  const [menuItems, setMenuItems] = useState(_menuItems);
  const [showMore, setShowMore] = useState(false);

  return (
    <NavWrap
      onClick={() => {
        setTooltipVisible(false);
      }}
    >
      <NavWrapInner
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeaderFlex>
          <img src="/images/logo_beta.svg" alt="" className="logo" />
          <CloseIconStyled
            onClick={() => {
              setTooltipVisible(false);
            }}
          />
        </HeaderFlex>
        {menuItems.map((item, index) => {
          if (item.text === 'ISO') {
            return (
              <NavLinkStyle active={showMore} key={index}>
                <h3
                  className="h3"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  {item.text} <CollapseSvg />
                </h3>
                {showMore ? <IsoContentIn setTooltipVisible={setTooltipVisible} /> : null}
              </NavLinkStyle>
            );
          }
          return (
            <div key={index}>
              <NavLink
                active={pathname.startsWith(item.link) && !showMore ? 't' : 'f'}
                to={item.link}
                key={item.link}
                onClick={() => {
                  if (item.children?.length) {
                  }
                  setTooltipVisible(false);
                  if (item.link.indexOf('https://') > -1) {
                    window.open(item.link);
                    return;
                  }
                  setMenuItems([...menuItems.map((v) => (v.children ? { ...v, collapsed: true } : v))]);
                  if (item.children?.length) {
                    setMenuItems([
                      ...menuItems.slice(0, index),
                      { ...item, collapsed: !item.collapsed },
                      ...menuItems.slice(index + 1),
                    ]);
                  }
                }}
              >
                {item.text}
                {item.children?.length && <CollapseSvg />}
              </NavLink>
              {/* {((item.children?.length && !item.collapsed) || pathname.startsWith('/nft')) && (
                <div className="sub-menu">{item.text === 'ISO' ? <IsoContentIn /> : null}</div>
              )} */}
            </div>
          );
        })}
        {/* <NavLinkP ref={BorrowTargetRef}>
          Borrow
          <i>Comming Soon</i>
        </NavLinkP> */}
      </NavWrapInner>
    </NavWrap>
  );
};

const SmallNav: FC<{ menuItems: IMenu[] }> = ({ menuItems }) => {
  const setMoreTooltipVisible = useRef<React.Dispatch<React.SetStateAction<boolean>>>();
  const {
    targetRef: MenuTargetRef,
    tooltip: MenuTooltip,
    tooltipVisible: MenuTooltipVisible,
    setTooltipVisible,
  } = useTooltip(
    <>
      <SmallNavTooltip _menuItems={menuItems} setTooltipVisible={setMoreTooltipVisible.current} />
    </>,
    {
      trigger: 'click',
      tootipStyle: {
        position: 'fixed',
        border: 'none',
        backgroundColor: 'transparent',
        width: '100%',
        padding: 0,
        left: 0,
        borderRadius: 0,
        transform: 'translate3d(0, 0, 0px)',
      },
      placement: 'auto-end',
      hideArrow: true,
    },
  );
  useEffect(() => {
    setMoreTooltipVisible.current = setTooltipVisible;
  }, [setTooltipVisible]);
  useEffect(() => {
    if (MenuTooltipVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [MenuTooltipVisible]);

  return (
    <MenuFooter>
      {MenuTooltipVisible && MenuTooltip}
      <FlexStyled>
        <WalletAccountInfo />
        <MenuBtn ref={MenuTargetRef}>
          <IconMenu active={MenuTooltipVisible} />
        </MenuBtn>
      </FlexStyled>
    </MenuFooter>
  );
};
const MenuFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: ${({ theme }) => theme.colors.cardBackground};
  box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  padding: 12px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.cardBorder};
  .position {
    position: relative;
    z-index: 1000;
  }
`;
const FlexStyled = styled(Flex)`
  align-items: center;
  justify-content: flex-end;
  position: relative;
  z-index: 999;
`;
const MenuBtn = styled.div`
  cursor: pointer;
  // box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.03);
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 6px;
  margin-left: 12px;
  // width: 30px;
  padding: 2px 2px 2px 6px;
`;
const NavWrap = styled.div`
  padding-left: 0;
  padding-right: 0;
  padding-top: 30px;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
  background-color: rgba(6, 6, 8, 0.8);
  &::-webkit-scrollbar {
    display: none;
  }
  .sub-menu {
    margin: 10px 0 20px;
  }
`;
const expandAnimation = keyframes`
  from {
  bottom: -260px;
  }
  to {
  bottom: 0;
  }
`;

const NavWrapInner = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  padding: 40px 30px 40px;
  // border-radius: 24px 24px 0 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  animation: ${() =>
    css`
      ${expandAnimation} 300ms linear forwards
    `};
`;
const HeaderFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding-bottom: 40px;
  .logo {
    height: 36px;
  }
`;
const CloseIconStyled = styled(CloseIcon)`
  width: 30px;
  fill: ${({ theme }) => theme.colors.textSubtle};
  transition: all 0.3s ease;
  &:hover {
    fill: ${({ theme }) => theme.colors.text};
  }
`;
const NavLinkStyle = styled.div<{ active: boolean }>`
  padding-left: 20px;
  // padding-right: 20px;
  padding-bottom: 20px;
  background-color: ${({ theme, active }) => (active ? theme.colors.background : 'transparent')};
  border-radius: 8px;
  .h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.textSubtle)};
    height: 48px;
    line-height: 48px;
    svg {
      width: 36px;
      fill: ${({ theme, active }) => (active ? theme.colors.text : theme.colors.textSubtle)};
      transform: ${({ active }) => (active ? 'scaleY(-1)' : '')};
    }
  }
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  font-size: 16px;
  color: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
  height: 48px;
  line-height: 48px;
  transition: all 0.3s ease;
  font-weight: 600;
  text-align: left;
  width: 100%;
  display: block;
  padding-left: 20px;
  background-color: ${({ theme, active }) => (active === 't' ? theme.colors.background : 'transparent')};
  border-radius: 8px;
  margin-bottom: 4px;
  svg {
    width: 36px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.text : theme.colors.textSubtle)};
    transform: ${({ active }) => (active === 't' ? 'scaleY(-1)' : '')};
  }
`;

export default SmallNav;
