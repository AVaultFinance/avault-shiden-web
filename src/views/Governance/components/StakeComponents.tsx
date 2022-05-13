// import getTimePeriods from 'utils/getTimePeriods';
import { Button } from '@my/ui';
import StakeBalance from './StakeComponents/Balance';
import TimerComponents from './StakeComponents/Countdown/Timer';

const StakeComponents = () => {
  return (
    <div>
      <StakeBalance />
      <TimerComponents />
      <Button>Create Lock</Button>
    </div>
  );
};
export default StakeComponents;
