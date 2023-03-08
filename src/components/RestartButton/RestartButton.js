import React from "react";

function RestartButton({ onClick }) {
  return (
    <button onClick={onClick} className="restart-btn">
      Restart
    </button>
  );
}

export default RestartButton;
