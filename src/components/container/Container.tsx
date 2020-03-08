import React, { FunctionComponent } from "react";
import "./container.css";
import cn from "classnames";

const Container: FunctionComponent<{
  className?: string;
  padded?: boolean;
}> = ({ children, className, padded }) => {
  return (
    <div
      className={cn("container", className, { "container--padded": padded })}
    >
      {children}
    </div>
  );
};

export default Container;
