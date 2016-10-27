import React from "react";

export default ({ children, text = "dare to invent the future." }) => {
  return (
    <div className="sans-serif near-white ph3">
      <h1 className="ma0 pv2 f-subheadline measure">
        { text }
      </h1>
      { children }
    </div>
  );
};

  //
  // import React from "react";
  //
  // const Root = ({ children }) =>
  //   <div>
  //     { children }
  //   </div>;
  //
  // Root.propTypes = { children: React.PropTypes.object };
  //
  // export default Root;
