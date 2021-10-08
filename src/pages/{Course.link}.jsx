import * as React from "react";
import Button from "../ui-components/button";
import * as pageStyle from "./course.module.scss";
import { graphql } from "gatsby";
import { useState, useEffect, useRef } from "react";
import DatabaseInterface from "../logic/database";
import SigninButton from "../ui-components/signinButton";
import StatusDot from "../ui-components/statusDot";

const isBrowser = typeof window !== "undefined";

const CoursePage = ({ data }) => {
	const { course } = data;
	const [lessonNumber, setLessonNumber] = useState(null);
	const [LessonComponent, setLessonComponent] = useState(null);
	useEffect(() => {
		if (typeof lessonNumber === "number") {
			setLessonComponent(
				React.lazy(_ =>
					import(
						"/courses/intro-to-webdev/lessons/" +
							course.lessons[lessonNumber].file
					)
				)
			);
			db.current.setStoredCourseData(course.id, { lessonNumber });
		}
	}, [lessonNumber]);
	const [session, setSession] = useState(null);
	const savedStatuses = {
		local_saved: {
			dot: "offline",
			message: "Not signed in",
		},
		online_saving: {
			dot: "warning",
			message: "Saving",
		},
		online_saved: {
			dot: "ready",
			message: "Saved",
		},
	};
	const [savedStatus, setSavedStatus] = useState("local_saved");
	const db = useRef();
	useEffect(function () {
		async function effect() {
			db.current = new DatabaseInterface(setSession, setSavedStatus);
			await db.current.init();
			const courseStatus = await db.current.getStoredCourseData(course.id);
			if (courseStatus) {
				setLessonNumber(courseStatus.lessonNumber);
			} else {
				setLessonNumber(0);
			}
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
						<div className="horizPanel">
							<span className={pageStyle.courseTitle}>{course.title}</span>
							<div className={pageStyle.statusIndicator}>
								<StatusDot status={savedStatuses[savedStatus].dot} />
								<span>{savedStatuses[savedStatus].message}</span>
							</div>
						</div>
						<span className={pageStyle.lessonName}>
							{typeof lessonNumber === "number"
								? course.lessons[lessonNumber].title
								: "-"}
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
					<LessonComponent db={db} session={session} courseId={course.id} />
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
			id
			lessons {
				file
				title
			}
		}
	}
`;
