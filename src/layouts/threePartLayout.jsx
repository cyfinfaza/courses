import React from "react";
import * as layoutStyle from "./threePartLayout.module.scss";
import { useRef, useState } from "react";
import Editor from "../environments/editor";
import HtmlFrame from "../environments/htmlFrame";

export default function ThreePartLayout({ directions, starterCode }) {
	const [editorCode, setEditorCode] = useState(starterCode);
	const htmlFrameActions = useRef(null);
	return (
		<>
			<div className={layoutStyle.container}>
				<div className={layoutStyle.lessonDescription}>{directions}</div>
				<div className={layoutStyle.editor}>
					<Editor
						language="html"
						initialCode={editorCode}
						onRun={code =>
							setEditorCode(code) || htmlFrameActions.current.refresh()
						}
					/>
				</div>
				<div className={layoutStyle.output}>
					<HtmlFrame
						code={editorCode}
						onActionsReady={actions => (htmlFrameActions.current = actions)}
					/>
				</div>
			</div>
		</>
	);
}
