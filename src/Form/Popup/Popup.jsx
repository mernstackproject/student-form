import React from "react";
import "./Popup.css";

const Popup = ({ message, type, closePopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ position: 'fixed', right: '20px', top: '20px' }}>
        <h2>{type}</h2>
        <p>{message}</p>
        <button onClick={closePopup} className={`${type === "Error" ? "close-btn" : "success-btn"}`}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
