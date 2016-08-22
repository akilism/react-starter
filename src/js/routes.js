import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Root from './components/Root';

export default () => (
  <Router history={ browserHistory }>
    <Route name="Root" component={ Root } path="/" />
  </Router>
);
