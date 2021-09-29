import * as React from "react";

const IndexPage = () => {
	window && (window.location = "/course");
	return (
		<p>
			Visit <a href="/course">course page</a>
		</p>
	);
};

export default IndexPage;
