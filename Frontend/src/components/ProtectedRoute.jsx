import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthValue } from '../providers/AuthProvider';

const TypeProtectedRoute = ({ component: Component, type, ...rest }) => {
  const { currentUser, firebaseAuthenticated, authenticated, isLoading } = useAuthValue();

  return <Route render={(props) => (
    isLoading ? (<></>) : (
      firebaseAuthenticated ? (
        authenticated ? (currentUser.user.type === type ? <Component {...props} /> : <Redirect to="/register-customer" />) : <Redirect to="/register-customer" />
      ) : <Redirect to="/login-page" />))} {...rest} />;
};

export default TypeProtectedRoute;