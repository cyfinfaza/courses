const fs = require("fs");
const path = require(`path`);

const coursesPath = path.resolve("./courses");

const courses = fs
	.readdirSync(coursesPath, { withFileTypes: true })
	.filter(dirent => dirent.isDirectory())
	.map(dirent => dirent.name);
console.log(courses);

const courseMetadata = courses.map(courseDirectory => {
	const courseFile = fs.readFileSync(
		path.join(coursesPath, courseDirectory, "course.json")
	);
	return {
		...JSON.parse(courseFile),
		key: courseDirectory,
		link: `/${courseDirectory}`,
	};
});

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
	const { createNode } = actions;
	courseMetadata.forEach(courseMetadataObject => {
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
