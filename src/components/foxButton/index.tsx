import React from "react";
import "../Header/header.css";
import "../foxButton/foxButton.css";

interface Props {
  height: string;
  width: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const FoxButton: React.FC<Props> = ({ height, width, children, onClick }) => {
  return (
    <button
      className="button"
      onClick={onClick}
      style={{
        height,
        width,
      }}
    >
      {children}
    </button>
  );
};

export default FoxButton;
