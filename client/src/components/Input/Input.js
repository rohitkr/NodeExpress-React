import React from "react";
import { createUseStyles } from "react-jss";

const buttonBackgroundColor = "#e629a0";
const buttonHoverBackgroundColor = "#b51f7e";
const buttonActiveBackgroundColor = "#8a165f";

const useStyle = createUseStyles({
  // Text input style
  jss_input: {
    padding: "0.9rem 1.2rem",
    width: "20rem",
    borderRadius: "15px",
    border: "1px solid #ccc",
    borderColor: "#ccc",
    fontSize: "1.6rem",
    "&:focus": {
      outline: "none",
      border: "1px solid #e629a0",
    },
  },
});

const JssInput = ({ children, className, ...rest }) => {
  const classes = useStyle();
  return (
    <input className={`${classes.jss_input} ${className}`} {...rest}>
      {children}
    </input>
  );
};

export default JssInput;
