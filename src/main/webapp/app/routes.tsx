import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from 'app/modules/home/home';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import Visualizer from "app/modules/visualizer/visualizer";
import { FarmMap } from 'app/modules/home/map/farm-map';


const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/" exact component={Home}/>
      <ErrorBoundaryRoute exact path={"/visualize/:folder/:id?"} component={Visualizer}/>
      <ErrorBoundaryRoute path={"/map"} component={FarmMap}/>
      <ErrorBoundaryRoute component={PageNotFound}/>
    </Switch>
  </div>
);

export default Routes;
