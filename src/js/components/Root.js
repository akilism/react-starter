import React from "react";

const testImg = require("../../assets/test.jpg");


const Root = ({ children, text = "some default text" }) =>
  <div>
    <h1>Hello, { text }</h1>
    <img src={ testImg } alt="test" />
    { children }
  </div>;

export default Root;

// export default class extends React.Component {
//   render() {
//     return <h1>Hello World</h1>;
//   }
// }
