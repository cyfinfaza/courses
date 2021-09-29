import React from "react";
import MonacoEditor from "@monaco-editor/react";
import * as componentStyle from "./editor.module.css";
import Button from "../ui-components/button";
import { useState, useRef } from "react";

export default function Editor({ initialCode, onChange, onRun, language }) {
	const [editorCode, setEditorCode] = useState(null);
	const editorRef = useRef(null);
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
				// value={initialCode}
				defaultValue={initialCode}
				onChange={onChange || null}
				onMount={editor => (editorRef.current = editor)}
			/>
			<Button
				icon="play_arrow"
				onClick={_ => onRun && onRun(editorRef.current.getValue())}
				className={componentStyle.runButton}
				accent
			>
				Run
			</Button>
		</div>
	);
}
