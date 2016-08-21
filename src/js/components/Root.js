import React from "react";

export default ({ children, text = "some default text" }) =>
  <div>
    <h1>Hello, { text }</h1>
    <img src="/assets/test.jpg" alt="test" />
    { children }
  </div>;
