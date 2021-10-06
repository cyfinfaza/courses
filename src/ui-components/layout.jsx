import React from "react";
import Button from "./button";
import * as componentStyle from "./layout.module.scss";

export default function () {
	return (
		<div className={componentStyle.container}>
			<div className={componentStyle.header}>
				<div>
					<h1>Cy2 Learn</h1>
				</div>
				<div>
					<Button>Sign In</Button>
				</div>
			</div>
		</div>
	);
}
