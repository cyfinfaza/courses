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
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
