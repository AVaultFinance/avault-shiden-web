import React, { FC } from 'react';
import styled from 'styled-components';
import UserWidget from './UserWidget';
import Logo from './Logo';
import Nav from './Nav';
import { Flex } from '@avault/ui';
const Header: FC<{ className?: string; setCollapsed: (collapsed: boolean) => void; collapsed: boolean }> = ({
  className,
  setCollapsed,
  collapsed,
}) => {
  return (
    <div className={className}>
      <div className="inner">
        <FlFlex>
          <Logo collapsed={collapsed} />
          <Nav collapsed={collapsed} />
        </FlFlex>
        <div className="right">
          <UserWidget />
        </div>
      </div>
    </div>
  );
};
const FlFlex = styled(Flex)`
  align-items: center;
  justify-content: flex-start;
`;
export default styled(Header)`
  // position: fixed;
  // top: 0px;
  // width: 100%;

  // z-index: ${({ theme }) => theme.zIndices.header};
  background-color: ${({ theme }) => theme.colors.background};
  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.tooltipColors.borderColor};
    ${({ theme }) => theme.mediaQueries.md} {
      height: 82px;
      padding-left: 0;
      padding-right: 0;
    }
    > img {
      width: 25px;
      height: 20px;
    }

    > .right {
      background-color: ${({ theme }) => theme.colors.background};
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 40px;
      // display: flex;
      // align-items: center;
      ${({ theme }) => theme.mediaQueries.md} {
        padding-top: 30px;
        padding-bottom: 30px;
      }
    }
  }
`;
