import styled from 'styled-components';

const LockInfo = () => {
  return (
    <LockInfoStyled>
      <h4>
        AVAT to be locked<i>218387.11</i>
      </h4>
      <h4>
        xAVAT balance<i>3848</i>
      </h4>
      <h4>
        APR<i className="green">281.11%</i>
      </h4>
      <h4>
        Unlock date<i>2025.10.12</i>
      </h4>
    </LockInfoStyled>
  );
};
const LockInfoStyled = styled.div`
  background-color: #181733;
  border: 1px solid #2e2d5b;
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 10px;
  }
  h4 {
    font-size: 14px;
    color: #6a6991;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
    i {
      color: #fff;
      float: right;
      &.green {
        color: ${({ theme }) => theme.colors.success};
      }
    }
  }
`;
export default LockInfo;
