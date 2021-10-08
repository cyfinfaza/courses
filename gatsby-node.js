const fs = require("fs");
const path = require(`path`);

const coursesPath = path.resolve("./courses");

async function getCourseData() {
	const courses = fs
		.readdirSync(coursesPath, { withFileTypes: true })
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);
	console.log(courses);

	return courses.map(courseDirectory => {
		const courseFile = fs.readFileSync(
			path.join(coursesPath, courseDirectory, "course.json")
		);
		let courseData = JSON.parse(courseFile);
		// courseData = {
		// 	...courseData,
		// 	lessons: courseData.lessons.map(async lesson => {
		// 		const lessonComponent = import(
		// 			path.join(coursesPath, courseDirectory, "/lessons/", lesson.file)
		// 		);
		// 		return { ...lesson, id: lessonComponent.id };
		// 	}),
		// };
		return {
			...courseData,
			key: courseDirectory,
			link: `/${courseDirectory}`,
		};
	});
}

exports.sourceNodes = async ({
	actions,
	createNodeId,
	createContentDigest,
}) => {
	const { createNode } = actions;
	const courseData = await getCourseData();
	courseData.forEach(courseMetadataObject => {
		const data = courseMetadataObject;
		createNode(
			Object.assign({}, data, {
				id: createNodeId(`course-${data.key}`),
				parent: null,
				children: [],
				internal: {
					type: `Course`,
					mediaType: `application/json`,
					content: JSON.stringify(data),
					contentDigest: createContentDigest(data),
				},
			})
		);
	});
};
