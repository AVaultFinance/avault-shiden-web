import { Input } from '@my/ui';
interface IProps {
  val: string;
  handleChange: any;
}
const weeksArr = [
  {
    text: '30Week',
    value: '30',
  },
  {
    text: '1year',
    value: '30',
  },
  {
    text: '2year',
    value: '30',
  },
  {
    text: '3year',
    value: '30',
  },
  {
    text: '4year',
    value: '30',
  },
];
const WeeksInput = ({ val, handleChange }: IProps) => {
  return (
    <div>
      <h2>How long would you like to lock for?</h2>
      <p>Select between 1 to 208 weeks</p>
      <ul>
        {weeksArr.map((v) => (
          <li key={v.text}>{v.text}</li>
        ))}
      </ul>
      <Input value={val} onChange={handleChange} />
    </div>
  );
};
export default WeeksInput;
