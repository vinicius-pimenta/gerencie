/* eslint-disable no-param-reassign */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
  isAuthorization?: boolean;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  isAuthorization = true,
  ...rest
}) => {
  const { user } = useAuth();

  const rotasEmployee: string[] = ["/dashboard", "/profile"]
  const rotaAnalisada: string = rest.path as string;

  if (user && user.role !== "Manager") {
    rotasEmployee.includes(rotaAnalisada) ? isAuthorization = true : isAuthorization = false;
  }

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user && isAuthorization ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : 'dashboard', state: { from: location } }} />
        );
      }}
    />
  );
};

export default Route;
