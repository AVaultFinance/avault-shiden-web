import { Button } from '@my/ui';
import { IIdoStateEnum } from 'state/ido/types';
import styled from 'styled-components';
interface IProps {
  changeIdoState: any;
}
const PositionAbsoult = ({ changeIdoState }: IProps) => {
  return (
    <PositionAbsoultStyled>
      <Button onClick={() => changeIdoState(IIdoStateEnum.INIT)}>change to init</Button>
      <Button onClick={() => changeIdoState(IIdoStateEnum.PROCING)}>change to process</Button>
      <Button onClick={() => changeIdoState(IIdoStateEnum.END)}>change to end</Button>
    </PositionAbsoultStyled>
  );
};
const PositionAbsoultStyled = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  button {
    height: 30px;
    margin-right: 20px;
  }
`;
export default PositionAbsoult;