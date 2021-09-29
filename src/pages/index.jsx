import * as React from "react";

const isBrowser = typeof window !== "undefined";

const IndexPage = () => {
	isBrowser && (window.location = "/course");
	return (
		<p>
			Visit <a href="/course">course page</a>
		</p>
	);
};

export default IndexPage;
