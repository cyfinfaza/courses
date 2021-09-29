import React from "react";
import * as layoutStyle from "./threePartLayout.module.scss";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import { useRef, useEffect, useState } from "react";
import Editor from "../environments/editor";
import HtmlFrame from "../environments/htmlFrame";

export default function ThreePartLayout(props) {
	// const editorElemRef = useRef(null);
	// useEffect(_ => {
	// 	monaco.editor.create(editorElemRef, {
	// 		value: "",
	// 		language: "html",
	// 		theme: "vs-dark",
	// 	});
	// }, []);
	const [editorCode, setEditorCode] = useState(
		`
<html>
	<body>
		<h1>Hello World</h1>
	</body>
</html>`.trim()
	);
	return (
		<>
			<div className={layoutStyle.container}>
				<div className={layoutStyle.lessonDescription}>
					<h1>Welcome</h1>
					<p>This is some lesson content.</p>
					<h2>Want some placeholder?</h2>
					<p>Here you go</p>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
						dolor sit amet, consectetur adipisicing elit. Ipsum necessitatibus
						neque omnis similique? Voluptates expedita laborum vero culpa
						dolores eaque beatae quibusdam, esse cupiditate consequatur nam,
						provident ea nihil fugit. Vitae aut praesentium tempora consectetur
						optio! Delectus eveniet quas provident, facere reprehenderit ipsam
						sapiente aliquid? Vitae odio rerum, atque reprehenderit, dignissimos
						recusandae nihil harum ab quia ad ea quam accusantium magni
						inventore iste quidem architecto dolor rem. Ipsam, adipisci beatae
						nostrum nam fugiat similique ad non reprehenderit molestias quas
						recusandae ea eveniet harum mollitia dolor maxime voluptates
						explicabo doloremque dolore. Aut voluptatem laboriosam soluta
						itaque, similique ab officia architecto illo.
					</p>
				</div>
				<div className={layoutStyle.editor}>
					<Editor
						language="html"
						initialCode={editorCode}
						onRun={setEditorCode}
					/>
				</div>
				<div className={layoutStyle.output}>
					<HtmlFrame code={editorCode} />
				</div>
			</div>
		</>
	);
}
