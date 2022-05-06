import { Button } from '@my/ui';
import styled, { keyframes } from 'styled-components';
const _Link = [
  { name: 'Discord', link: 'https://discord.gg/WcARFMy2t8' },
  { name: 'Twitter', link: 'https://twitter.com/Avault_Astar ' },
  { name: 'Medium', link: 'https://medium.com/@avault ' },
  { name: 'Github', link: 'https://github.com/AVaultFinance ' },
  { name: 'doc', link: 'https://co-go.gitbook.io/avault/ ' },
];
const Home = () => {
  return (
    <HomeInner>
      <HomeInnerInner>
        <img src="./images/home/logo.svg" alt="Avault" />
        <h1>The First Native Yield Aggregator</h1>
        <h1>on Astar Network</h1>
        <div className="icon">
          <div className="svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="small">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="89188piuaa">
                  <stop stopColor="#8C1AB5" offset="0%" />
                  <stop stopColor="#17B38D" offset="100%" />
                </linearGradient>
              </defs>
              <path fill="url(#89188piuaa)" transform="rotate(180 6 6)" d="M6 0L12 12 0 12z" fillRule="evenodd" />
            </svg>
          </div>
          <div className="svg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="big">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="89188piuaa">
                  <stop stopColor="#8C1AB5" offset="0%" />
                  <stop stopColor="#17B38D" offset="100%" />
                </linearGradient>
              </defs>
              <path fill="url(#89188piuaa)" transform="rotate(180 6 6)" d="M6 0L12 12 0 12z" fillRule="evenodd" />
            </svg>
          </div>
        </div>
        {/* <h2>Coming&nbsp;&nbsp;Soon</h2> */}
        <ButtonStyled>
          <a href="/vault">Launch Dapp</a>
        </ButtonStyled>
        <UlStyled>
          {_Link.map((v, index) => (
            <li key={index}>
              <a href={v.link} target="_blank" rel="noreferrer">
                <img src={`/images/${v.name.toLowerCase()}.svg`} alt={v.name} />
              </a>
            </li>
          ))}
        </UlStyled>
      </HomeInnerInner>
    </HomeInner>
  );
};
const ButtonStyled = styled(Button)`
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  height: 44px;
  background-image: linear-gradient(90deg, #8c1ab5 0%, #17b38d 100%);
  width: 200px;
  padding: 0;
  cursor: pointer;
  margin-top: 50px;
  a {
    display: block;
    height: 44px;
    width: 200px;
    line-height: 44px;
  }
`;

const UlStyled = styled.ul`
  list-style: none;
  margin-top: 24px;
  li {
    margin: 0 10px;
    display: inline-block;
    &:last-child {
      img {
        width: 34px;
      }
    }
    a {
      display: block;
      cursor: pointer;
      opacity: 1;
      transition: all 0.3s ease;
      &:hover {
        opacity: 0.6;
      }
    }
    img {
      display: block;
      width: 40px;
    }
  }
`;
const smallAnimation = keyframes`
  0% {
    opacity: 1;
  transform: scale(0.8);
  }
  50% {
    opacity: .5;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(0.8);
  }
`;

const bigAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: .5;
    transform: scale(.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const HomeInnerInner = styled.div`
  .small {
    width: 12px;
    animation: 1s ${smallAnimation} linear infinite;
  }
  .big {
    width: 20px;
    animation: 1s ${bigAnimation} linear infinite;
  }
  .svg {
    width: 30px;
    height: 15px;
    margin: 0 auto;
    // svg {
    //   position: absolute;
    //   width: 100%;
    //   top: 50%;
    //   left: 50%;
    //   transform: translateY(-50%) translateX(-50%);
    // }
  }
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  text-align: center;
  img {
    margin-bottom: 30px;
    width: 144px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: 50px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      margin-bottom: 70px;
    }
  }
  h1 {
    color: ${({ theme }) => theme.colors.text};
    line-height: 38px;
    font-size: 18px;
    ${({ theme }) => theme.mediaQueries.sm} {
      line-height: 48px;
      font-size: 30px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      line-height: 68px;
      font-size: 44px;
    }
  }
  .icon {
    svg {
      display: block;
      margin: 10px auto;
    }
  }
  h2 {
    display: inline-block;
    background-image: linear-gradient(270deg, #f94ef9 0%, #05e9b5 100%);
    -webkit-background-clip: text;
    color: transparent;
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    padding-bottom: 50px;
    ${({ theme }) => theme.mediaQueries.sm} {
      font-size: 20px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 28px;
    }
  }
`;
const HomeInner = styled.div`
  background-image: url('./images/home/bg.png');
  background-size: 105%;
  background-position: center;
  min-height: 100vh;
  background-repeat: no-repeat;
  @media screen and (min-width: 1500px) {
    background-size: 1840px;
  }
`;

export default Home;
