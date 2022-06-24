import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Text } from '@my/ui';
import { ISOPathConfig, IMenuDetail } from '../config';
export const IsoContentIn = ({ setTooltipVisible }: { setTooltipVisible?: any }) => {
  const { pathname } = useLocation();
  return useMemo(
    () => (
      <IsoContentInStyled>
        {ISOPathConfig.map((item: IMenuDetail, index) => (
          <NavLink
            to={item.link}
            key={index}
            onClick={() => {
              if (item.link.indexOf('https://') > -1) {
                window.open(item.link);
                return;
              }
              if (setTooltipVisible) {
                setTooltipVisible(false);
              }
            }}
            isLast={index === ISOPathConfig.length - 1 ? true : false}
            active={pathname.startsWith(item.link) ? 't' : 'f'}
          >
            <div className="icon-holder">
              {typeof item.img === 'string' ? <img src={item.img} alt={item.text} /> : item.img()}
            </div>
            <div className="fr_text">
              <h3>{item.text}</h3>
              <DetailText>{item.detail}</DetailText>
            </div>
            <div className="fr_arr">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
                <defs>
                  <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="ori3sxjrja">
                    <stop stop-color="#A428D0" offset="0%" />
                    <stop stop-color="#20D4A9" offset="100%" />
                  </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <rect fill="url(#ori3sxjrja)" width="36" height="24" rx="8" />
                  <path
                    d="M20.4,8 C20.47897,8 20.5561731,8.02337521 20.6218801,8.06717988 L26,11.6525932 L20.6218801,15.2380064 C20.4380686,15.3605474 20.1897209,15.3108779 20.0671799,15.1270664 C20.0233752,15.0613594 20,14.9841563 20,14.9051863 L19.999,12.652 L12,12.6525932 C11.4477153,12.6525932 11,12.2048779 11,11.6525932 C11,11.1003084 11.4477153,10.6525932 12,10.6525932 L20,10.6525932 L20,8.4 C20,8.1790861 20.1790861,8 20.4,8 Z"
                    fill="#FFF"
                  />
                </g>
              </svg>
            </div>
          </NavLink>
        ))}
        <a
          href="https://co-go.gitbook.io/avault/product/iso-launchpad"
          title="iso launchpad"
          target="_blank"
          rel="noreferrer"
          className="link_noreferrer"
        >
          What is ISO？
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10">
            <path
              d="M11.9643204,2.01681756 C12.0432904,2.01681756 12.1204935,2.04019277 12.1862005,2.08399745 L16.560174,4.99997977 L12.1862005,7.9159621 C12.002389,8.03850309 11.7540413,7.98883354 11.6315003,7.80502206 C11.5876956,7.73931506 11.5643204,7.66211198 11.5643204,7.58314199 L11.5643204,5.83262204 L3.83264226,5.83262204 C3.37278664,5.83262204 3,5.4598354 3,4.99997977 C3,4.54012415 3.37278664,4.16733751 3.83264226,4.16733751 L11.5643204,4.16733751 L11.5643204,2.41681756 C11.5643204,2.19590366 11.7434065,2.01681756 11.9643204,2.01681756 Z"
              fillRule="evenodd"
            />
          </svg>
        </a>
      </IsoContentInStyled>
    ),
    [pathname, setTooltipVisible],
  );
};
const IsoContentInStyled = styled.div`
  padding-right: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 0;
  }
  .link_noreferrer {
    text-align: center;
    display: block;
    font-size: 12px;
    color: #6a6991;
    padding-top: 20px;
    transition: color 0.3s ease;
    &:hover {
      color: #fff;
      svg {
        fill: #fff;
      }
    }
    svg {
      transition: fill 0.3s ease;
      fill: #6a6991;
      width: 20px;
    }
  }
`;
const DetailText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  font-weight: 500;
`;
const NavLink = styled(Link)<{ active: 't' | 'f'; isLast: boolean }>`
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 336px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  transition: all 0.3s ease;
  padding: 16px;
  border-radius: 12px;
  margin-right: ${({ isLast }) => (isLast ? '0' : '34px')};
  margin-top: ${({ isLast }) => (isLast ? '0' : '10px')};
  background-color: #181733;
  border: 1px solid ${({ active }) => (active === 't' ? '#fff' : '#2E2D5B')};
  .fr_text {
    width: 66%;
  }
  .fr_arr {
    width: 14%;
    transition: opacity 0.3s ease;
    opacity: 0;
  }
  .icon-holder {
    width: 30px;
    height: 60px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 30px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      height: 60px;
    }
  }
  h3 {
    padding: 4px 0;
  }
  &:hover {
    border-color: #fff;
    .fr_arr {
      opacity: 1;
    }
  }
`;
const IsoContent = (
  <>
    <IsoContentIn />
  </>
);
export default IsoContent;
