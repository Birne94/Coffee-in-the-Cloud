var grunt = require("grunt");

grunt.loadNpmTasks("grunt-contrib-jshint");
grunt.loadNpmTasks("grunt-contrib-less");
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks("grunt-browser-sync");
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-run');

grunt.initConfig({
	jshint: {
		all: {
			src: ["Gruntfile.js", "js/**/*.js"],
			options: {
				jshintrc: true
			}
		}
	},
	less: {
		development: {
			options: {
				paths: ["public/less"],
				sourceMap: true,
				sourceMapFilename: "css/style.css.map",
				sourceMapRootpath: "/",
				compress: true,
				yuicompress: true,
				optimization: 2
			},
			files: {
				"public/css/style.css": "less/style.less"
			}
		}
	}
});

grunt.registerTask("default", ["less"]);