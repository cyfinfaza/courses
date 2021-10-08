import React from "react";
import * as layoutStyle from "./threePartLayout.module.scss";
import { useRef, useState, useEffect } from "react";
import Editor from "../environments/editor";
import HtmlFrame from "../environments/htmlFrame";

export default function ThreePartLayout({
	directions,
	starterCode,
	courseId,
	lessonId,
	db: { current: db },
}) {
	const [editorCode, setEditorCode] = useState(starterCode);
	const [frameCode, setFrameCode] = useState(starterCode);
	const htmlFrameActions = useRef(null);
	useEffect(() => {
		let initFromDb = async () => {
			const retrievedCode = await db.getStoredLessonData(courseId, lessonId);
			if (retrievedCode) {
				setEditorCode(retrievedCode.code);
				setFrameCode(retrievedCode.code);
			}
		};
		let onLogout = () => {
			setEditorCode(starterCode);
			setFrameCode(starterCode);
		};
		initFromDb();
		db.registerOnReady(initFromDb);
		db.registerOnLogout(onLogout);
		return _ => {
			initFromDb = null;
			onLogout = null;
		};
	}, [db]);
	useEffect(() => {
		// console.log(editorCode);
		db.setStoredLessonData(courseId, lessonId, { code: editorCode });
	}, [editorCode]);
	return (
		<>
			<div className={layoutStyle.container}>
				<div className={layoutStyle.lessonDescription}>{directions}</div>
				<div className={layoutStyle.editor}>
					<Editor
						language="html"
						initialCode={editorCode}
						onChange={code => setEditorCode(code)}
						revertButton={editorCode != starterCode}
						onRevert={_ => {
							setEditorCode(starterCode);
							setFrameCode(starterCode);
						}}
						onRun={code =>
							setFrameCode(code) || htmlFrameActions.current.refresh()
						}
					/>
				</div>
				<div className={layoutStyle.output}>
					<HtmlFrame
						code={frameCode}
						onActionsReady={actions => (htmlFrameActions.current = actions)}
					/>
				</div>
			</div>
		</>
	);
}
