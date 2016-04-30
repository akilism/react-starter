import React from 'react';

const Root = ({ text = "some default text" }) =>
  <h1>Hello, { text }</h1>;

export default Root;

// export default class extends React.Component {
//   render() {
//     return <h1>Hello World</h1>;
//   }
// }
