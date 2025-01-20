const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const csso = require('postcss-csso');

const config = {
	plugins: [
		postcssPresetEnv({
			stage: 2,
			features: {
				'media-query-ranges': true,
			},
		}),
		autoprefixer(),
		csso(),
	],
};

module.exports = config;
