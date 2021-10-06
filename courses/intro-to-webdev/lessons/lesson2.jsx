import React from "react";
import ThreePartLayout from "/src/layouts/threePartLayout";
import cubeCode from "./cubeCode";

export default function () {
	return (
		<ThreePartLayout
			directions={
				<>
					<h1>Lesson 2</h1>
					<p>probably an intro to elements</p>
				</>
			}
			starterCode={"hi"}
		/>
	);
}
