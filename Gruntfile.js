/*global module:false*/

'use strict';
var path = require('path');

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
		'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
		' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		
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
					dest: './testOut/main.js'
				},
				files: [
					{
						cwd: './testIn/files/',
						src: '*.js',
						expand: true,
						flatten: true
					}
				]
			}
		},

	});

	// Load all required tasks from tasks folder
	grunt.loadTasks('tasks');

	// Load external tasks
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('test', ['packit:test']);
	grunt.registerTask('default', ['test']);

};

