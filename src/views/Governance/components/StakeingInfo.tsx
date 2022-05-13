import { Button } from '@my/ui';

const StakeingInfo = () => {
  return (
    <div>
      <h2>Governance</h2>
      <h3>Staking Info</h3>
      <Button>
        682.11%
        <i>APY</i>
      </Button>
      <div className="stakeingInfo_buttom">
        <ul>
          <li>
            <p>Average lock time</p>
            <h4>48.11Weeks</h4>
          </li>
          <li>
            <p>Total AVAT locked</p>
            <h4>283M</h4>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default StakeingInfo;
