import React from "react";
import {Button} from "navi-design-system";

const NaviButton = ({ children, className, ...rest }) => {
  return (
    <Button className={className} {...rest}>
      {children}
    </Button>
  );
}
export default NaviButton;