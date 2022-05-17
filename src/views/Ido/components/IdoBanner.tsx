import { useMemo } from 'react';
import styled from 'styled-components';

interface IProps {
  isMobile: boolean;
}
const IdoBanner = ({ isMobile }: IProps) => {
  return useMemo(() => {
    return (
      <IdoBannerStyled>
        <h1>Avault Public Sale</h1>
        <h2>
          We will sell a total of 2,000,000 AVA. The price of AVA is determined by the user. We will form LP with half
          of the total amount of astar invested by the user and AVA, and release it to the user.The other half of the
          ASTR will be released within half a year by the LPs of participating IDO users.
        </h2>
        {isMobile ? (
          <img className="banner_bg_h5" src="/images/ido/h5_banner.webp" alt="Avault Public Sale" />
        ) : (
          <img className="banner_bg_pc" src="/images/ido/pc_banner.webp" alt="Avault Public Sale" />
        )}
      </IdoBannerStyled>
    );
  }, [isMobile]);
};
const IdoBannerStyled = styled.div`
  background-image: url('./images/stake/bg_element.svg');
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: right 47px;
  position: relative;
  padding-left: 8%;
  padding-bottom: 100px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 12%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 240px;
    padding-left: 5%;
    background-size: 420px;
    background-position: right 246px;
  }
  img {
    display: block;
    position: absolute;
    top: 65px;
    ${({ theme }) => theme.mediaQueries.md} {
      top: 117px;
    }
  }
  .banner_bg_pc {
    min-width: 1204px;
    left: 2%;
  }
  .banner_bg_h5 {
    width: 100%;
    left: 5.2%;
  }
  h1 {
    padding-top: 200px;
    padding-bottom: 40px;
    width: 60%;
    background: linear-gradient(90deg, #ffd8fe 0%, #c5fff1 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 48px;
    line-height: 52px;

    ${({ theme }) => theme.mediaQueries.xs} {
      padding-top: 300px;
    }
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 50%;
      padding-top: 418px;
      padding-bottom: 36px;
    }

    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 96px;
      line-height: 100px;
      padding-top: 518px;
    }
  }
  h2 {
    width: 90%;
    font-size: 15px;
    line-height: 24px;
    ${({ theme }) => theme.mediaQueries.sm} {
      width: 60%;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      width: 446px;
    }
  }
`;
export default IdoBanner;
