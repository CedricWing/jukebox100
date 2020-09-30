import React, { PureComponent } from "react";
import "./LoadingSpinner.css";

class LoadingSpinner extends PureComponent {
  render() {
    return (
      !this.props.loaded && (
        <div className={this.props.containerStyle}>
          <div className="spinner-border loader-style" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    );
  }
}

export default LoadingSpinner;
