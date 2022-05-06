import React, { lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ResetCSS } from '@avault/ui';
import BigNumber from 'bignumber.js';
// import { usePollBlockNumber } from 'state/block/hooks';
// import { useFetchProfile } from 'state/profile/hooks';
import GlobalStyle from './style/Global';
import SuspenseWithChunkError from './components/SuspenseWithChunkError';
import { ToastListener } from './contexts/ToastsContext';
import history from './routerHistory';
import { PriceProvider } from './contexts/PriceProvider';
import SideMenu from './components/SideMenu';
import { usePollCoreFarmData } from 'state/farms/hooks';
import { usePollCompoundingData } from 'state/compounding/hooks';
import { usePollBlockNumber } from 'state/block/hooks';
import PageLoader from 'components/Loader/PageLoader';
import Unbind from 'views/Stake/Unbind';
// import { useFetchProfile } from 'state/profile/hooks';
// import { usePollCoreFarmData } from './state/farms/hooks';

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Compounding = lazy(() => import('./views/Compounding/index'));

const Home = lazy(() => import('./views/Home'));
const Farms = lazy(() => import('./views/Farms'));
const Stake = lazy(() => import('./views/Stake/Stake'));
const UnStake = lazy(() => import('./views/Stake/Unstake'));
const NotFound = lazy(() => import('./views/NotFound'));

// This config is required for number formatting
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
});

const App: React.FC = () => {
  usePollBlockNumber();
  // useFetchProfile();
  usePollCoreFarmData();
  // pool
  usePollCompoundingData();
  return (
    <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
      <PriceProvider />
      <SideMenu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/vault">
              <Compounding />
            </Route>
            <Route path="/stake">
              <Stake />
            </Route>
            <Route path="/unbind">
              <Unbind />
            </Route>
            <Route path="/unstake">
              <UnStake />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>

            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </SideMenu>
      <ToastListener />
    </Router>
  );
};

export default React.memo(App);
