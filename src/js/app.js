import React from "react";
import ReactDOM from "react-dom";
import _ from "mori";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import Router from "./routes";
import * as reducers from './state/reducers';

require("tachyons");
require("../styles/main.scss");

// For hot reloading.
if (module.hot) { module.hot.accept(); }

const toAppState = (initialState) => {
  return Object.keys(initialState).reduce((acc, k) => {
    const reducerState = {};
    reducerState[k] = _.toClj(initialState[k]);
    return Object.assign({}, acc, reducerState);
  }, {});
};

const appInitialState = toAppState(window.__INITIAL_STATE__);
const reducer = combineReducers(reducers);
const store = createStore(reducer, appInitialState, applyMiddleware(thunk));

ReactDOM.render((
  <Provider store={ store }>
    <Router />
  </Provider>), document.getElementById("app"));
