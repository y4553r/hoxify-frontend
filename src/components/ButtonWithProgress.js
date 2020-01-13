import React from 'react';

const ButtonWithProgress = ({ onClick, text, disabled, pendingApiCall }) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-primary"
        onClick={onClick}
        disabled={disabled}
      >
        {pendingApiCall && (
          <div className="spinner-border text-light spinner-border-sm mr-sm-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {text}
      </button>
    </div>
  );
}

export default ButtonWithProgress;