import React from "react";
import ThreePartLayout from "layouts/threePartLayout";

export const id = "97eda484-4211-461e-83dc-6b395f04e2e1";

export default function Lesson() {
	return (
		<ThreePartLayout
			lessonId={id}
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
