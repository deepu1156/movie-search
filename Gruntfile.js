module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [
						["babelify", {
							"presets": ["react"]
						}]
					]
				},
				files: {
					"./public/build/bundle.js": ["./public/javascripts/main.js"]
				}
			}
		},
		watch: {
			scripts: {
				files: ["./public/javascripts/*.js"],
				tasks: ["browserify"]
			}
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["watch"]);
	grunt.registerTask("build", ["browserify"]);
};