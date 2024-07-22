import React from "react";
import { createUseStyles } from "react-jss";

const buttonBackgroundColor = "#e629a0";
const buttonHoverBackgroundColor = "#b51f7e";
const buttonActiveBackgroundColor = "#8a165f";

const useStyle = createUseStyles({
  button: {
    background: buttonBackgroundColor,
    color: "#ffffff",
    padding: "10px 20px",
    minWidth: "150px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "1.5rem",
    "&:hover": {
      background: buttonHoverBackgroundColor,
      outline: "none",
    },
    "&:active": {
      background: "#8a165f",
      transform: "scale(0.98)",
      outline: "none",
    },
    "&:focus": {
      outline: `4px solid ${buttonActiveBackgroundColor}`,
    },
  },
});

const JssButton = ({ children, className, ...rest }) => {
  const classes = useStyle();
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default JssButton;
