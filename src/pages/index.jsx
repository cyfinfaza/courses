import * as React from "react";

const isBrowser = typeof window !== "undefined";

const IndexPage = () => {
	// isBrowser && (window.location = "/course");
	return (
		<p style={{ margin: "16px" }}>
			This site is currently in development. Visit the{" "}
			<a href="/course">course page</a> for a sneak peak at what's coming.
		</p>
	);
};

export default IndexPage;
