import React from "react";
import * as componentStyle from "./inputs.module.scss";
import { Link } from "gatsby";

export default function Input({ className, ...props }) {
	return (
		<input
			className={componentStyle.input + (className ? " " + className : "")}
			{...props}
		/>
	);
}
