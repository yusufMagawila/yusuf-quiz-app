import React from "react";
import "./ProgressBar.css"; // Add CSS styles if needed

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <span>
        Question {current} of {total}
      </span>
    </div>
  );
};

export default ProgressBar;