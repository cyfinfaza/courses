import React from "react";
import * as componentStyle from "./statusDot.module.scss";

const statuses = {
	ready: "var(--ready)",
	warning: "var(--warning)",
	alert: "var(--alert)",
	offline: "var(--foreground-hover)",
};

const StatusDot = ({ status = "offline" }) => {
	return (
		<div
			className={componentStyle.dot}
			style={{ backgroundColor: statuses[status] }}
		></div>
	);
};

export default StatusDot;
