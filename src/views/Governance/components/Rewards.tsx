import { Button } from '@my/ui';
import DefaultImg from 'components/DefaultImg';
import styled from 'styled-components';
interface IProps {
  rewards: any[];
}
const Rewards = ({ rewards }: IProps) => {
  return (
    <RewardsStyled>
      <h2 className="rewards_title">Rewards</h2>
      <ul>
        {[1, 2, 3, 4].map((v) => (
          <Row key={v} v={v} />
        ))}
      </ul>
    </RewardsStyled>
  );
};

const Row = ({ v }: { v: number }) => {
  return (
    <li>
      <div className="row_title">
        <TokenWrapper>
          {/* {isSingle ? (
          token0Address ? (
            <img src={getImageUrlFromToken(token0Address)} className="img" alt="" />
          ) : (
            <DefaultImg />
          )
        ) : token0Address ? (
          <TokenPairImage
            variant="inverted"
            primaryToken={token0Address}
            secondaryToken={token1Address}
            width={60}
            height={60}
          />
        ) : ( */}
          <DefaultImg />
          {/* )} */}
        </TokenWrapper>
        <h2>label</h2>
      </div>
      <h3 className="apr">
        18%
        <i>APR</i>
      </h3>
      <div className="small">
        <h3>
          <i>Rewards</i>
          89.18
        </h3>
        <Button disabled={v === 1 ? false : true}>Claim</Button>
      </div>
      <h3 className="big">
        89.18
        <i>Rewards</i>
      </h3>
      <Button className="big" disabled={v === 1 ? false : true}>
        Claim
      </Button>
    </li>
  );
};
const TokenWrapper = styled.div`
  padding-right: 8px;
  width: 75px;
  .img {
    display: block;
    width: 62%;
    margin: 0 auto;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 20px;
    width: 80px;
  }
`;
const RewardsStyled = styled.div`
  .rewards_title {
    display: none;
    ${({ theme }) => theme.mediaQueries.md} {
      display: block;
      font-size: 30px;
      padding: 40px 40px 30px;
    }
  }
  ul {
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0 30px 40px;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #2e2d5b;
      border-radius: 12px;
      padding: 10px 16px 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
      background-color: #181733;
      ${({ theme }) => theme.mediaQueries.md} {
        padding: 0 30px;
        min-height: 96px;
        border-radius: 20px;
        transition: background-color 0.5s ease;
        background-repeat: no-repeat;
      }
      &:hover {
        background-color: #25234c;
      }
      &:last-child {
        margin-bottom: 0;
      }

      .row_title {
        display: flex;
        align-items: center;
        justify-content: start;
      }
      h2 {
        font-size: 18px;
      }
      h3 {
        font-size: 20px;
        &.apr {
          color: #31dab1;
          text-align: right;
          i {
            display: block;
            font-weight: 500;
            font-size: 12px;
          }
          ${({ theme }) => theme.mediaQueries.md} {
            color: #fff;
            text-align: left;
            i {
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        ${({ theme }) => theme.mediaQueries.md} {
          font-size: 30px;
        }
        i {
          font-size: 12px;
          color: #6a6991;
          padding-top: 6px;
          padding-left: 6px;
        }
      }
      .small {
        display: block;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #2e2d5b;
        border-radius: 12px;
        width: 100%;
        padding: 20px 16px;
        margin-top: 6px;
        h3 {
          color: #cc64f2;
          i {
            display: block;
            padding-left: 0;
            padding-top: 0;
            padding-bottom: 10px;
            margin-top: 0;
          }
        }
        ${({ theme }) => theme.mediaQueries.md} {
          display: none;
        }
      }
      .big {
        display: none;
        ${({ theme }) => theme.mediaQueries.md} {
          display: block;
        }
      }
      button {
        padding: 0 26px;
        height: 40px;
        ${({ theme }) => theme.mediaQueries.md} {
          padding: 0 38px;
        }
      }
    }
  }
`;
export default Rewards;
