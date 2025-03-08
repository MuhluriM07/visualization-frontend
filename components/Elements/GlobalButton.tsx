import React from "react";

interface ButtonProps {
    label?: string;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
    onClick: () => void;
  }

const GlobalButton: React.FC<ButtonProps> = ({
    label = "Close",
    color = 'black',
    backgroundColor = 'transparent',
    borderColor = 'black',
    onClick,
}) => {
    const buttonStyle: React.CSSProperties = {
        color: color,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        padding: '10px 15px',
        border: `1px solid ${borderColor}`,
        borderRadius: '5px',
        cursor: 'pointer',
      };

    return(
        <button className="text-center w-full bg-SparkDigitalPink shadow-[2px 4px 16px rgba(8, 45, 108, 0.2)]" style={buttonStyle} onClick={onClick}>
        {label}
      </button>
    )
}

export default GlobalButton;