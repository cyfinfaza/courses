import * as React from "react";
import { graphql } from "gatsby";
import Button from "../ui-components/button";
import Layout from "../ui-components/layout";
import { useState, useEffect, useRef } from "react";
import DatabaseInterface from "../logic/database";
import * as pageStyle from "./index.module.scss";
import ReactTimeago from "react-timeago";

export default function IndexPage({ data }) {
	const [session, setSession] = useState();
	const [storedCourses, setStoredCourses] = useState();
	const db = useRef();
	useEffect(() => {
		(async function () {
			db.current && setStoredCourses(await db.current.getAllStoredCourses());
		})();
	}, [session]);
	useEffect(function () {
		async function effect() {
			db.current = new DatabaseInterface(setSession);
			await db.current.init();
			setStoredCourses(await db.current.getAllStoredCourses());
		}
		effect();
	}, []);
	const Card = ({ children }) => (
		<div className={pageStyle.card}>{children}</div>
	);
	return (
		<Layout db={db} session={session}>
			<div style={{ textAlign: "center" }}>
				<h1 className="title">
					{session?.user
						? "Hello, " + session.user.user_metadata.full_name
						: "Welcome"}
				</h1>
				<p>
					Cy2 Learn is a collection (or really just one at the moment) of
					courses on topics I feel like I am ready to teach others, and that I
					think others should know. It's built with{" "}
					<a href="https://github.com/cyfinfaza/courses">
						<code>courses</code>
					</a>
					, an open-source platform built from the ground up for interactive
					software development education.
				</p>
				<h2>Please select a course</h2>
			</div>
			<div>
				{data.allCourse.nodes.map(course => (
					<Card key={course.key}>
						<div
							className="vertiPanel"
							style={{ gap: "calc(var(--spacing) * 0.5)" }}
						>
							<h2>{course.title} </h2>
							<p>{course.description}</p>
						</div>
						<div className="horizPanel">
							{storedCourses &&
								(_ => {
									const storedCourse = storedCourses.filter(
										c => c.id === course.id
									)[0];
									console.log(storedCourse);
									return (
										storedCourse.data && (
											<small style={{ textAlign: "right" }}>
												{/* Last opened{" "}
												{new Date(storedCourse.modified_at).toLocaleString()}{" "}
												<br />
												Working on: Lesson {storedCourse.data.lessonNumber +
													1}{" "}
												- {course.lessons[storedCourse.data.lessonNumber].title} */}
												<span style={{ fontStyle: "italic" }}>
													{course.lessons[storedCourse.data.lessonNumber].title}
												</span>
												<br />{" "}
												<ReactTimeago
													date={new Date(storedCourse.modified_at)}
													minPeriod={60}
												/>
											</small>
										)
									);
								})()}
							<Button
								icon="launch"
								linksTo={course.link}
								style={{ display: "inline-flex" }}
								accent
							>
								Launch
							</Button>
						</div>
					</Card>
				))}
			</div>
		</Layout>
	);
}

export const query = graphql`
	query {
		allCourse {
			nodes {
				title
				description
				author
				link
				key
				lessons {
					title
				}
			}
		}
	}
`;
