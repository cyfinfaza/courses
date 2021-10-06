import * as React from "react";
import { graphql } from "gatsby";
import Button from "../ui-components/button";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export default ({ data }) => {
	return (
		<div style={{ margin: "16px" }}>
			<h1>Welcome.</h1>
			This site is currently in development. Visit a course page for a sneak
			peak at what's coming.
			<h2>Please select a course</h2>
			<ul>
				{data.allCourse.nodes.map(course => (
					<li key={course.key}>
						<h3>{course.title} </h3>
						<small>
							by <strong>{course.author}</strong>
						</small>
						<p>{course.description}</p>
						<Button
							icon="launch"
							linksTo={course.link}
							style={{ display: "inline-flex" }}
							accent
						>
							Launch
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export const query = graphql`
	query {
		allCourse {
			nodes {
				title
				description
				author
				link
				key
			}
		}
	}
`;
