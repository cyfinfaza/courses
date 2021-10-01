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
	const content = (
		<>
			{iconElement ? (
				<div className={componentStyle.buttonIconElementContainer}>
					{iconElement}
				</div>
			) : (
				icon && (
					<span className={`material-icons-round ${componentStyle.buttonIcon}`}>
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
