import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateTask from '../pages/CreateTasks';

import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/tasks';
import EditTask from '../pages/EditTasks';
import ListUsers from '../pages/ListUsers';
import EditEmployee from '../pages/EditEmployee';
import CreateEmployee from '../pages/CreateEmployee';

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
    <Route
      path="/create-employee"
      component={CreateEmployee}
      isPrivate
      isAuthorization
    />
    <Route path="/edit-task" component={EditTask} isPrivate isAuthorization />
    <Route path="/tasks" component={Tasks} isPrivate isAuthorization />
    <Route path="/employees" component={ListUsers} isPrivate isAuthorization />
    <Route
      path="/edit-employee"
      component={EditEmployee}
      isPrivate
      isAuthorization
    />
  </Switch>
);

export default Routes;
