import React from "react";
import "../Views.css";
const Loading = () => {
  return (
    <div className="container">
      <div className="loader loader-pulse">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
      </div>
    </div>
  );
};

export default Loading;
