import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Root from './components/Root';

export default (
  <Router history={ browserHistory }>
    <Route name="Root" component={ Root } path="/" />
  </Router>
);

// import React from 'react';

// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import { appReducer } from './state/reducers';

// const logger = createLogger();

// const store = createStore(appReducer, applyMiddleware(thunk));

// export default () => {
//   return (
//     // <Provider store={ store }>
//       <Router >
//         <Route path="/" component={Root}>
//           <IndexRoute
//             pageHeading="Documents"
//             itemType="documents"
//             component={DocumentList}
//           />
//           <Route
//             pageHeading=""
//             path="login"
//             component={Login}
//           />
//           <Route
//             pageHeading="Tags"
//             itemType="tags"
//             path="tags"
//             component={TagList}
//           />
//           <Route
//             pageHeading="Public Figures"
//             itemType="publicFigures"
//             path="public-figures"
//             component={PublicFigureList}
//           />
//           <Route
//             pageHeading="Settings"
//             itemType="user"
//             path="settings"
//             component={Settings}
//           />
//         </Route>
//       </Router>
//     // </Provider>
//   );
// };
