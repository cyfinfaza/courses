import React from "react";
import * as componentStyle from "./hotkeyLabel.module.css";

export default function HotkeyLabel({ children, hotkey }) {
	return (
		<div className={componentStyle.container}>
			{children}
			<span className={componentStyle.hotkeyLabel}>{hotkey.join("+")}</span>
		</div>
	);
}
