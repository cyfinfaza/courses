import React from "react";
import ThreePartLayout from "/src/layouts/threePartLayout";
import cubeCode from "./cubeCode";

const id = "647320ad-037f-4bd4-b144-89370474ccf9";

export default function Lesson(props) {
	return (
		<ThreePartLayout
			{...props}
			lessonId={id}
			directions={
				<>
					<h1>Welcome!</h1>
					<p>This is a course on web development.</p>
					<h2>What is Web Development?</h2>
					<p>
						That's a good question. Web developers create the sites you use
						every day. There are two main types of web development, frontend and
						backend. Frontend developers create the user interfaces and the code
						that you "touch", so to speak. Backend developers create the code
						that runs on servers that web browsers talk to.
					</p>
					<h2>What this course covers</h2>
					<p>
						This course focuses purely on frontend. You will learn the basics of
						writing HTML, CSS, and JavaScript, which are enough to get you
						started creating little projects and games. You will also learn how
						to interact with backend APIs from your frontend application, using{" "}
						<code>fetch</code>.
					</p>
					<h2>An Important Note</h2>
					<p>
						The secret behind most professional web developers is that they're
						actually just professional "Googlers". You will not succeed at this
						course (or at web development in general) if you are afraid to look
						something up online. Get used to it. This is the only course in
						which cheating is encouraged.
					</p>
				</>
			}
			starterCode={cubeCode}
		/>
	);
}
