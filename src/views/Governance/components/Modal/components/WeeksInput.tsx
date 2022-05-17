import styled from 'styled-components';
import { Input } from '@my/ui';
interface IProps {
  val: string;
  handleChange: any;
  setWeekVal: any;
  weekLiVal: string;
  setWeekLiVal: any;
}
// timestamp s
// block 6s
// 1day

const WeeksInput = ({ val, handleChange, setWeekVal, weekLiVal, setWeekLiVal }: IProps) => {
  return (
    <WeeksInputStyled>
      <h2>How long would you like to lock for?</h2>
      <p className="grey">Select between 1 to 208 weeks</p>
      <ul>
        {weeksArr.map((v) => (
          <li
            key={v.text}
            className={weekLiVal === v.value ? 'on' : ''}
            onClick={() => {
              setWeekLiVal(v.value);
              setWeekVal('');
            }}
          >
            {v.text}
          </li>
        ))}
      </ul>
      <InputStyled
        pattern={`^[0-9]*`}
        inputMode="decimal"
        value={val}
        step="any"
        min="0"
        onChange={handleChange}
        placeholder="Number OF WEEK"
      />
    </WeeksInputStyled>
  );
};
const weeksArr = [
  {
    text: '30Week',
    value: '30',
  },
  {
    text: '1year',
    value: '52',
  },
  {
    text: '2year',
    value: '104',
  },
  {
    text: '3year',
    value: '156',
  },
  {
    text: '4year',
    value: '208',
  },
];
const WeeksInputStyled = styled.div`
  margin-top: 30px;
  h2 {
    font-size: 16px;
    margin-bottom: 12px;
  }
  .grey {
    font-size: 12px;
    color: #6a6991;
  }
  ul {
    padding-top: 16px;
    // display: flex;
    // justify-content: start;
    // align-items: center;
    li {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: 108px;
      background-color: #25234c;
      border-radius: 8px;
      font-size: 15px;
      color: #6a6991;
      font-weight: 600;
      line-height: 36px;
      margin-right: 10px;
      margin-bottom: 10px;
      transition: all 0.3s ease;
      cursor: pointer;
      &.on {
        color: #ffffff;
        background-color: #1476ff;
      }
      &:hover {
        color: #ffffff;
        background-color: #1476ff;
        opacity: 0.8;
      }
    }
  }
`;
const InputStyled = styled(Input)`
  margin-top: 2px;
  width: 180px;
`;
export default WeeksInput;
