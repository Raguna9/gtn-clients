import React from "react";
import loaderSvg from "./loader.svg";
import "./loadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="modal is-active loading-overlay">
      <div className="loading-icon">
        <img src={loaderSvg} alt="Loader" />
      </div>
    </div>
  );
}

export default LoadingOverlay;
