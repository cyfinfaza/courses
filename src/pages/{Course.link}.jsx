import * as React from "react";
import Button from "../ui-components/button";
import * as pageStyle from "./course.module.scss";
import { graphql } from "gatsby";
import { useState, useEffect, useRef } from "react";
import DatabaseInterface from "../logic/database";
import SigninButton from "../ui-components/signinButton";

const isBrowser = typeof window !== "undefined";

const CoursePage = ({ data }) => {
	const { course } = data;
	const [lessonNumber, setLessonNumber] = useState(0);
	const [LessonComponent, setLessonComponent] = useState(null);
	useEffect(() => {
		setLessonComponent(
			React.lazy(_ =>
				import(
					"/courses/intro-to-webdev/lessons/" +
						course.lessons[lessonNumber].file
				)
			)
		);
	}, [lessonNumber]);
	const [session, setSession] = useState(null);
	const db = useRef();
	useEffect(function () {
		async function effect() {
			db.current = new DatabaseInterface(setSession);
			await db.current.init();
		}
		effect();
	}, []);
	function incrementLesson(howMuch) {
		const index = lessonNumber + howMuch;
		if (course.lessons[index]) {
			setLessonNumber(index);
			return true;
		}
		return false;
	}
	return (
		<div className={pageStyle.container}>
			<div className={pageStyle.headerBar}>
				<div className={pageStyle.headerLeft}>
					<div className={pageStyle.controls}>
						<Button
							icon="chevron_left"
							onClick={_ => incrementLesson(-1)}
						></Button>
						<Button
							icon="chevron_right"
							accent
							onClick={_ => incrementLesson(1)}
						></Button>
					</div>
					<div className={pageStyle.titles}>
						<span className={pageStyle.courseTitle}>{course.title}</span>
						<span className={pageStyle.lessonName}>
							{course.lessons[lessonNumber].title}
						</span>
					</div>
				</div>
				<div className={pageStyle.options}>
					<Button icon="home" linksTo="/">
						Home
					</Button>
					<SigninButton session={session} db={db} />
				</div>
			</div>
			{isBrowser && LessonComponent ? (
				<React.Suspense fallback={<span></span>}>
					<LessonComponent />
				</React.Suspense>
			) : (
				<span></span>
			)}
		</div>
	);
};

export default CoursePage;

export const pageQuery = graphql`
	query ($id: String!) {
		course(id: { eq: $id }) {
			title
			lessons {
				file
				title
			}
		}
	}
`;
