import { IIdoStateEnum } from 'state/ido/types';
import styled from 'styled-components';
interface IProps {
  idoState: IIdoStateEnum;
}
const InfoContribution = ({ idoState }: IProps) => {
  return (
    <InfoContributionStyled>
      <h2>$0.00</h2>
      <h3>AVAT Estimated price</h3>

      <h2 className="fr">$0.00</h2>
      <h3 className="fr">The network is in Astar</h3>
    </InfoContributionStyled>
  );
};
const InfoContributionStyled = styled.div`
  padding-top: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 40px;
  }
  .fr {
    text-align: right;
    ${({ theme }) => theme.mediaQueries.md} {
      text-align: left;
    }
  }
  h2 {
    font-size: 48px;
    line-height: 52px;
    ${({ theme }) => theme.mediaQueries.md} {
      font-size: 80px;
      line-height: 100px;
    }
  }
  h3 {
    font-size: 14px;
    padding-bottom: 60px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding-bottom: 107px;
    }
  }
`;
export default InfoContribution;
