import * as React from "react";
import Button from "../ui-components/button";
import ThreePartLayout from "../layouts/threePartLayout";
import * as pageStyle from "./course.module.scss";

const coursePage = () => {
	return (
		<div className={pageStyle.container}>
			<div className={pageStyle.headerBar}>
				<div className={pageStyle.headerLeft}>
					<span className={pageStyle.courseTitle}>
						Intro to Web Development
					</span>
					<span className={pageStyle.lessonName}>
						Intro, and an important note
					</span>
				</div>
				<div className={pageStyle.options}>
					<Button icon="home">Home</Button>
					<Button icon="login" accent>
						Sign In
					</Button>
				</div>
			</div>
			<ThreePartLayout />
		</div>
	);
};

export default coursePage;
