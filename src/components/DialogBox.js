import React from "react";

const DialogBox = ({ children, onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

export default DialogBox;
