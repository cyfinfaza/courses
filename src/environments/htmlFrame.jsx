import React from "react";
import { useEffect, useRef } from "react";

export default function HtmlFrame({ code, title = "output", ...props }) {
	return <iframe srcDoc={code} title={title} frameBorder="0" {...props} />;
}
