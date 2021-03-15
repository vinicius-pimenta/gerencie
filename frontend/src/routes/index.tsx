import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateTask from '../pages/CreateTasks';

import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/tasks';
import Edit from '../pages/EditTasks';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route
      path="/create-task"
      component={CreateTask}
      isPrivate
      isAuthorization
    />
    <Route path="/edit-task" component={Edit} isPrivate isAuthorization />
    <Route path="/tasks" component={Tasks} isPrivate isAuthorization />
  </Switch>
);

export default Routes;
