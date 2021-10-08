import React from "react";
import MonacoEditor from "@monaco-editor/react";
import * as componentStyle from "./editor.module.css";
import Button from "../ui-components/button";
import { useState, useRef } from "react";
import HotkeyLabel from "../ui-components/hotkeyLabel";

export default function Editor({
	initialCode,
	onChange,
	onRun,
	language,
	onRevert,
	revertButton,
}) {
	const [editorCode, setEditorCode] = useState(null);
	const editorRef = useRef(null);
	const run = _ => onRun && onRun(editorRef.current.getValue());
	return (
		<div
			className={componentStyle.container}
			onKeyDown={event => {
				if (event.ctrlKey && event.key === "s") {
					event.preventDefault();
					run();
				}
			}}
		>
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
				// defaultValue={initialCode}
				onChange={onChange || null}
				onMount={editor => (editorRef.current = editor)}
			/>
			<div className={`horizPanel ${componentStyle.controls}`}>
				{revertButton && (
					<Button
						onClick={_ => onRevert && onRevert()}
						confirm
						icon="restart_alt"
					>
						Reset
					</Button>
				)}
				<Button icon="play_arrow" onClick={run} accent>
					<HotkeyLabel hotkey={["ctrl", "s"]}>Run</HotkeyLabel>
				</Button>
			</div>
		</div>
	);
}
