import React from "react";
import * as componentStyle from "./button.module.scss";
import { Link } from "gatsby";

export default function Button({ linksTo, onClick, children, icon, accent, style, className }) {
  const content = (
    <>
      {icon && <span className={`material-icons-round ${componentStyle.buttonIcon}`}>{icon}</span>}
      {children}
    </>
  );
  const globalProps = {
    className: componentStyle.button + (accent ? " " + componentStyle.accent : "") + (className ? " " + className : ""),
    style: style,
  };
  if (linksTo) {
    return (
      <Link to={linksTo} {...globalProps}>
        {content}
      </Link>
    );
  } else {
    return (
      <button onClick={onClick} {...globalProps}>
        {content}
      </button>
    );
  }
}
