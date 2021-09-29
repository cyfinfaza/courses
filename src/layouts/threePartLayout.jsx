import React from "react";
import * as layoutStyle from "./threePartLayout.module.scss";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function ThreePartLayout(props) {
	// const editorElemRef = useRef(null);
	// useEffect(_ => {
	// 	monaco.editor.create(editorElemRef, {
	// 		value: "",
	// 		language: "html",
	// 		theme: "vs-dark",
	// 	});
	// }, []);
	return (
		<>
			<div className={layoutStyle.container}>
				<div className={layoutStyle.lessonDescription}>
					<h1>Welcome</h1>
					<p>This is some lesson content.</p>
				</div>
				<div className={layoutStyle.editor}>
					{/* <MonacoEditor
						theme="vs-dark"
						language="java"
						options={{
							minimap: { enabled: false },
							cursorSmoothCaretAnimation: true,
							// automaticLayout: true,
						}}
					/> */}
					<Editor
						theme="vs-dark"
						language="html"
						options={{
							minimap: { enabled: false },
							cursorSmoothCaretAnimation: true,
							automaticLayout: true,
						}}
						onMount={(editor, monaco) => {
							window.layout = editor.layout;
						}}
					/>
					{/* <div ref={editorElemRef} /> */}
				</div>
				<div className={layoutStyle.output}>
					<iframe
						src="https://cy2.me"
						frameBorder="0"
						title="code output"
					></iframe>
				</div>
			</div>
		</>
	);
}
