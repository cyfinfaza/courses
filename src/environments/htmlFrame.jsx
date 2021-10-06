import React from "react";
import { useEffect, useRef } from "react";

export default function HtmlFrame({
	code,
	title = "output",
	onActionsReady,
	...props
}) {
	// console.log(code);
	const frameRef = useRef(null);
	function refresh() {
		frameRef.current.contentWindow.location.reload();
	}
	useEffect(_ => {
		onActionsReady && onActionsReady({ refresh });
	}, []);
	return (
		<iframe
			srcDoc={code}
			title={title}
			frameBorder="0"
			ref={frameRef}
			{...props}
		/>
	);
}
