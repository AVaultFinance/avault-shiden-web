import React, { FC } from 'react';
import styled from 'styled-components';
import DappstakeSubNav from './SubNav';
import { IDappStakingInterface } from 'utils/types';
import { IDappPoolDataInterface } from '../hooks/getPoolUpdate';

const StyledPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 0;
  min-height: calc(100vh-64px);
  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-bottom: 0;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 10px;
    min-height: calc(100vh-64px);
  }
`;
const StyledPage = ({ children, ...props }) => {
  return <StyledPageStyle {...props}>{children}</StyledPageStyle>;
};
const StakePageLayout = styled.div`
  min-height: 0px;
  width: 480px;
  // background-image: linear-gradient(270deg, #fc00ff 0%, #7d49ff 100%);
  // box-shadow: 2px 4px 7px 1px rgba(9, 2, 18, 0.3);
  border-radius: 23px;
  padding: 0;
  border: 1px solid #2e2d5b;
  overflow: hidden;
  // margin: 100px auto;
  background: ${({ theme }) => theme.colors.cardBackground};
`;
const TableContent = styled.div`
  border-radius: 20px;
  padding: 30px 16px 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 30px 30px 30px;
  }
`;
// slippageAdjustedAmounts
interface Iprops {
  children: React.HTMLAttributes<HTMLDivElement>;
  contract: IDappStakingInterface;
  pool: IDappPoolDataInterface;
}
const DappstakePage: FC<Iprops> = ({ children, contract, pool, ...props }) => {
  return (
    <StakePageLayout>
      <TableContent>
        <DappstakeSubNav />
        <StyledPage>{children}</StyledPage>
      </TableContent>
    </StakePageLayout>
  );
};
export default DappstakePage;
