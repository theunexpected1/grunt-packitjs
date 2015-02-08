module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		
		// Task configuration
		watch: {
			gruntfile: {
				files: ['Gruntfile.js', 'tasks/packit.js'],
				tasks: ['default']
			}
		},
		packit: {
			options: {
				attribution: true,
				base62: true,
				shrink: false
			},

			// targets
			test: {
				options: {
					pack: true,
					banners: true,
					action: 'write',
					dest: './out/main.js'
				},
				files: [{
					cwd: './in',
					src: '*.js',
					expand: true,
					flatten: true
				}]
			}
		}
	});

	// Load all required tasks from tasks folder
	grunt.loadTasks('tasks');

	// Load external tasks
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('test', ['packit:test']);
	grunt.registerTask('default', ['test']);
};