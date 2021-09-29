// monaco webpack plugin
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
exports.oncreateWebpackConfig = ({ stage, loaders, actions }) => {
	actions.setWebpackConfig({
		module: {
			plugins: [
				new MonacoWebpackPlugin({
					languages: ["html"],
				}),
			],
		},
	});
};
