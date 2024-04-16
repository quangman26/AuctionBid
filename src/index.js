import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AddressProvider } from './AddressContext';
import App from './App';
import Login from './Login';
import ListProduct from './ListProduct';
import AddressInfo from './AddressInfo';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AddressProvider>
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>

          <Route path="/App">
            <App />
          </Route>

          <Route path="/AddressInfo">
            <AddressInfo />
          </Route>
              <Route path="/ListProduct">
            <ListProduct />
          </Route>
        </Switch>
      </AddressProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
