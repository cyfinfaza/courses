import React from "react";
import * as layoutStyle from "./threePartLayout.module.scss";
import { useRef, useState, useEffect, useContext } from "react";
import Editor from "../environments/editor";
import HtmlFrame from "../environments/htmlFrame";
import { DbContext } from "../logic/database";

export default function ThreePartLayout({ directions, starterCode, lessonId }) {
	const { db, courseId, viewMode } = useContext(DbContext);
	console.log(viewMode);
	const [editorCode, setEditorCode] = useState(starterCode);
	const [frameCode, setFrameCode] = useState(starterCode);
	const htmlFrameActions = useRef(null);
	useEffect(() => {
		let initFromDb = async () => {
			const retrievedCode = await db.getStoredLessonData(courseId, lessonId);
			if (retrievedCode) {
				if (viewMode) {
					console.log("replacing with ", retrievedCode);
					// const blob = new Blob([retrievedCode.code], { type: "text/html" });
					// const url = URL.createObjectURL(blob);
					// window.open(url, "_self");
					// document.body.parentElement.innerHTML = retrievedCode.code;
					document.write(retrievedCode.code);
					document.close();
					// setTimeout(() => {
					// 	document.open();
					// 	document.write(retrievedCode.code);
					// 	document.close();
					// }, 2000);
				} else {
					setEditorCode(retrievedCode.code);
					setFrameCode(retrievedCode.code);
				}
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
	}, [db, courseId, lessonId, starterCode]);
	useEffect(() => {
		// console.log(editorCode);
		db.setStoredLessonData(courseId, lessonId, { code: editorCode });
	}, [editorCode, courseId, db, lessonId]);
	if (viewMode) {
		return <p>Loading...</p>;
	}
	return (
		<>
			<div className={layoutStyle.container}>
				<div className={layoutStyle.lessonDescription}>{directions}</div>
				<div className={layoutStyle.editor}>
					<Editor
						language="html"
						initialCode={editorCode}
						onChange={code => setEditorCode(code)}
						revertButton={editorCode !== starterCode}
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
