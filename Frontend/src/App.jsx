import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './assets/vendor/nucleo/css/nucleo.css';
import './assets/vendor/font-awesome/css/font-awesome.min.css';
import './assets/scss/argon-design-system-react.scss?v1.1.0';


import Login from './views/examples/Login';
import RegisterCustomer from './views/examples/RegisterCustomer';
import RegisterRestaurant from './views/examples/RegisterRestaurant';
import InputMenu from './views/examples/InputMenu';
import CustomersProfile from './views/examples/CustomersProfile';
import CheckIn from './views/examples/CheckIn';
import HomeCustomers from './views/examples/HomeCustomers';
import RestaurantLandingPage from './views/examples/RestaurantLandingPage';
import RestaurantOrders from './views/examples/RestaurantOrders';
import RestaurantProfile from './views/examples/RestaurantProfile';
import RestaurantDetails from './views/examples/RestaurantDetails';

import { AuthProvider } from './providers/AuthProvider';
import TypeProtectedRoute from './components/ProtectedRoute';

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path="/login-page" exact render={props => <Login {...props} />} />
          <Route
            path="/register-customer"
            exact
            render={props => <RegisterCustomer {...props} />}
          />
          <Route
            path="/register-restaurant"
            exact
            render={props => <RegisterRestaurant {...props} />}
          />
          <TypeProtectedRoute
            path="/home-customers"
            exact
            component={props => <HomeCustomers {...props} />}
            type="Customer"
          />
          <TypeProtectedRoute
            path="/restaurant-details"
            exact
            component={props => <RestaurantDetails {...props} />}
            type="Customer"
          />
          <TypeProtectedRoute
            path="/restaurant-landingpage"
            exact
            component={props => <RestaurantLandingPage {...props} />}
            type="Customer"
          />
          <TypeProtectedRoute
            path="/customers-profile"
            exact
            component={props => <CustomersProfile {...props} />}
            type="Customer"
          />
          <TypeProtectedRoute
            path="/input-menu"
            exact
            component={props => <InputMenu {...props} />}
            type="Restaurant"
          />
          <TypeProtectedRoute
            path="/restaurant-profile"
            exact
            component={props => <RestaurantProfile {...props} />}
            type="Restaurant"
          />
          <TypeProtectedRoute
            path="/restaurant-checkin"
            exact
            component={props => <CheckIn {...props} />}
            type="Restaurant"
          />
          <TypeProtectedRoute
            path="/restaurant-orders"
            exact
            component={props => <RestaurantOrders {...props} />}
            type="Restaurant"
          />
          <Redirect to="/login-page" />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;