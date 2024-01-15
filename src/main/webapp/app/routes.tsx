import React from 'react';
import {Switch, Redirect, useLocation} from 'react-router-dom';

import Home from 'app/modules/home/home';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import Visualizer from "app/modules/visualizer/visualizer";
import Upload from './modules/upload/upload-farm';
import Dashboard from './modules/dashboard/farm-dashboard';
import Connector from './modules/visualizer/vis-connector/connector';
import VisConfigurer from './modules/visualizer/vis-configurer/configurer';

const Routes = () => {
  const { pathname } = useLocation(); 
  return (
  <div className="view-routes">
    <Switch>
      <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} /> 
      <ErrorBoundaryRoute path="/" exact component={Home}/>
      <ErrorBoundaryRoute path="/upload" exact component={Upload}/>
      <ErrorBoundaryRoute path="/dashboard/:id" exact component={Dashboard}/>
      <ErrorBoundaryRoute exact path={"/visualize"} component={Connector}/>
      <ErrorBoundaryRoute exact path={"/configure/:folder"} component={VisConfigurer} />
      <ErrorBoundaryRoute exact path={"/visualize/:folder/:id?"} component={Visualizer}/>
      <ErrorBoundaryRoute component={PageNotFound}/>
    </Switch>
  </div>
  );
}

export default Routes;
