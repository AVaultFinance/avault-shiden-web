import { Button } from '@my/ui';
import { IIsoStateEnum } from 'views/Iso/state/ido/types';
import styled from 'styled-components';
interface IProps {
  changeIsoState: any;
}
const PositionAbsoult = ({ changeIsoState }: IProps) => {
  return (
    <PositionAbsoultStyled>
      <Button onClick={() => changeIsoState(IIsoStateEnum.INIT)}>change to init</Button>
      <Button onClick={() => changeIsoState(IIsoStateEnum.PROCING)}>change to process</Button>
      <Button onClick={() => changeIsoState(IIsoStateEnum.WAITINGGETLP)}>change to WAITINGGETLP</Button>
      <Button onClick={() => changeIsoState(IIsoStateEnum.END)}>change to end</Button>
    </PositionAbsoultStyled>
  );
};
const PositionAbsoultStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 20px;
  z-index: 9999;
  width: 100px;
  height: 130px;
  opacity: 0;
  transition: all 0.3s ease;
  &:hover {
    opacity: 1;
  }
  button {
    height: 30px;
    margin-right: 20px;
  }
`;
export default PositionAbsoult;
