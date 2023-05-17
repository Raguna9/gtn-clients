import React from "react";
import { ReactComponent as LoaderIcon } from "./loader.svg";
import "./loadingOverlay.css";

function LoadingOverlay() {
  return (
    <div className="modal is-active loading-overlay">
      <div className="loading-icon">
        <LoaderIcon />
      </div>
    </div>
  );
}

export default LoadingOverlay;
