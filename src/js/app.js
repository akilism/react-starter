import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

// For hot reloading.
if (module.hot) { module.hot.accept(); }

ReactDOM.render(<Root />, document.getElementById('app'));
