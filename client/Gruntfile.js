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
	run: {
		options: {
			cwd: './js/bower_components/forge/'
		},
		forgeInstall: {
			cmd: 'npm',
			args: ["install"]
		},
		forgeMinify: {
			cmd: 'npm',
			args: ["run", "minify"]
		}
	},
	less: {
		development: {
			options: {
				paths: ["public/less"],
				sourceMap: true,
				sourceMapFilename: "css/style.css.map",
				sourceMapRootpath: "/"
			},
			files: {
				"public/css/style.css": "less/style.less"
			}
		}
	},
	copy: {
		vendor: {
			files: [
				{ expand: true,
					cwd: "node_modules/font-awesome/",
					src: ["css/**", "fonts/**"],
					dest: "vendor/",
					filter: "isFile" }
			]
		}
	},
	watch: {
		scripts: {
			files: ["less/**/*.less"],
			tasks: ["less"],
			options: {
				spawn: false
			}
		}
	},
	browserSync: {
		dev: {
			bsFiles: {
				src: "css/*.css"
			},
			options: {
				port: 3001,
				watchTask: true
			}
		}
	}
});

grunt.registerTask("default", ["browserSync", "less", "watch"]);

grunt.registerTask("build", ["copy", "less", "run:forgeInstall", "run:forgeMinify"]);

