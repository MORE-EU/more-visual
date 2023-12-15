import React from 'react';
import {Switch} from 'react-router-dom';

import Home from 'app/modules/home/home';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import Visualizer from "app/modules/visualizer/visualizer";
import Upload from './modules/upload/upload-farm';
import Connector from './modules/connector/connector';


const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path="/" exact component={Home}/>
      <ErrorBoundaryRoute path="/upload" exact component={Upload}/>
      <ErrorBoundaryRoute path="/visualize" exact component={Connector}/>
      <ErrorBoundaryRoute exact path={"/visualize/:folder/:id?"} component={Visualizer}/>
      <ErrorBoundaryRoute component={PageNotFound}/>
    </Switch>
  </div>
);

export default Routes;
