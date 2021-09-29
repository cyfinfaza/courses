import React from "react";
import MonacoEditor from "@monaco-editor/react";
import * as componentStyle from "./editor.module.css";
import Button from "../ui-components/button";
import { useState, useRef } from "react";

export default function Editor({ initialCode, onChange, onRun, language }) {
	const [editorCode, setEditorCode] = useState(null);
	return (
		<div className={componentStyle.container}>
			<MonacoEditor
				theme="vs-dark"
				language={language}
				options={{
					minimap: { enabled: false },
					cursorSmoothCaretAnimation: true,
					automaticLayout: true,
					fontSize: 16,
				}}
				value={initialCode}
				onChange={(...args) => {
					setEditorCode(args[0]);
					onChange(...args);
				}}
			/>
			<Button
				icon="play_arrow"
				onClick={_ => onRun && onRun(editorCode)}
				className={componentStyle.runButton}
				accent
			>
				Run
			</Button>
		</div>
	);
}
