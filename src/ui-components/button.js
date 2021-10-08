import React from "react";
import * as componentStyle from "./inputs.module.scss";
import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { useState } from "react";

export default function Button({
	linksTo,
	onClick,
	children,
	icon,
	iconElement,
	accent,
	style,
	className,
	confirm = false,
}) {
	// console.log(icon && children);
	const [confirmActive, setConfirmActive] = useState(false);
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
			{confirmActive ? "Are you sure?" : children}
		</>
	);
	const globalProps = {
		className:
			componentStyle.input +
			(accent ? " " + componentStyle.accent : "") +
			(confirmActive ? " " + componentStyle.alert : "") +
			(className ? " " + className : ""),
		style: style,
	};
	if (linksTo) {
		return (
			// <Link to={linksTo} {...globalProps}>
			// 	{content}
			// </Link>
			<AniLink
				paintDrip
				to={linksTo}
				color="#000"
				duration={0.75}
				{...globalProps}
			>
				{content}
			</AniLink>
		);
	} else {
		return (
			<button
				onBlur={_ => setConfirmActive(false)}
				onClick={args => {
					if (confirm) {
						if (confirmActive) {
							setConfirmActive(false);
							onClick(args);
						} else {
							setConfirmActive(true);
						}
					} else {
						onClick(args);
					}
				}}
				{...globalProps}
			>
				{content}
			</button>
		);
	}
}
