import React from "react";
import * as componentStyle from "./glow.module.scss";

export default function Glow({ children }) {
	return (
		<div className={componentStyle.container}>
			<div>{children}</div>
			<div>{children}</div>
		</div>
	);
}
