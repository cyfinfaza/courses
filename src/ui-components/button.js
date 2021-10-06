import React from "react";
import * as componentStyle from "./inputs.module.scss";
import { Link } from "gatsby";

export default function Button({
	linksTo,
	onClick,
	children,
	icon,
	iconElement,
	accent,
	style,
	className,
}) {
	console.log(icon && children);
	const content = (
		<>
			{iconElement ? (
				<div className={componentStyle.buttonIconElementContainer}>
					{iconElement}
				</div>
			) : (
				icon && (
					<span
						className={`material-icons-round ${componentStyle.buttonIcon}`}
						style={icon && children ? null : { margin: "0" }}
					>
						{icon}
					</span>
				)
			)}
			{children}
		</>
	);
	const globalProps = {
		className:
			componentStyle.input +
			(accent ? " " + componentStyle.accent : "") +
			(className ? " " + className : ""),
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
