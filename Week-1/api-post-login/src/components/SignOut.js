import React from "react";

export const SignOut = () => {
  function handleClick() {
    document.location.href = "/";
  }
  return (
    <div>
      <button
        className="btn btn-outline-danger"
        type="button"
        onClick={handleClick}
      >
        Sign Out
      </button>
    </div>
  );
};
