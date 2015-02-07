/*global module:false*/
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
				usePatternForFiles: false,
				js: true,
				css: false,
				attribution: true,
				js: {
					base62: true,
					shrink: false
				},
				css: {
					// Pending
				}
			},
			
			// targets
			test: {
				js:{
					files: [
						{
							cwd: './lib/Source/',
							src: ['Plugins/JQuery.customButton.js', 'Plugins/JQuery.lazy.load.xt.js', 'Plugins/moment.js', 'Musafir.js', 'Musafir.configuration.js', 'Musafir.dataType.js', 'Musafir.utility.js', 'Musafir.ui.js', 'Musafir.ui.form.js', 'Musafir.ui.form.resolution.js', 'Musafir.ui.form.payment.js', 'Musafir.payment.js', 'Default.js'],
							pack: true,
							banners: true,
							action: 'write', // 'write', 'append', 'prepend'
							dest: './dist/musafir.js'
						}
					]
				}
			},

			dev: {
				js: {
					files:[
						'<%= dev.js.musafir1 %>',
						'<%= dev.js.musafir2 %>',
						'<%= dev.js.trip %>'
					]
				}
			},
			dist: {
				js: {
					files:[
						'<%= dist.js.musafir1 %>',
						'<%= dist.js.musafir2 %>',
						'<%= dist.js.trip %>'
					]
				}
			}
		},

  		// Arbitrary properties used in task configuration templates.
	  	dev:{
	  		js: {
		  		musafir1:{
		  			cwd: '<%= dist.js.musafir1.cwd %>',
		  			src: '<%= dist.js.musafir1.src %>',
		  			pack: false,
		  			banners: true,
		  			action: '<%= dist.js.musafir1.action %>',
		  			dest: './dist/musafir.development.js'
		  		},
		  		musafir2:{
		  			cwd: '<%= dist.js.musafir2.cwd %>',
		  			src: '<%= dist.js.musafir2.src %>',
		  			pack: false,
		  			banners: true,
		  			action: '<%= dist.js.musafir2.action %>',
		  			dest: './dist/musafir.development.js'
		  		},
		  		trip:{
		  			cwd: '<%= dist.js.trip.cwd %>',
		  			src: '<%= dist.js.trip.src %>',
		  			pack: false,
		  			banners: true,
		  			action: '<%= dist.js.trip.action %>',
		  			dest: './dist/musafir.trip.development.js'
		  		}
		  	}
	  	},

	  	dist:{
	  		js: {
		  		musafir1:{
		  			cwd: './lib/Source/',
		  			src: ['Plugins/JQuery.customButton.js', 'Plugins/JQuery.lazy.load.xt.js', 'Plugins/moment.js', 'Musafir.js', 'Musafir.configuration.js', 'Musafir.dataType.js', 'Musafir.utility.js', 'Musafir.ui.js', 'Musafir.ui.form.js', 'Musafir.ui.form.resolution.js', 'Musafir.ui.form.payment.js', 'Musafir.payment.js', 'Default.js'],
		  			pack: true,
		  			banners: true,
		  			action: 'write', // 'write', 'append', 'prepend'
		  			dest: './dist/musafir.js'
		  		},
		  		musafir2:{
		  			cwd: './lib/Source/',
		  			src: ['Prepend.js'],
		  			pack: false,
		  			banners: true,
		  			action: 'prepend', // 'write', 'append', 'prepend'
		  			dest: './dist/musafir.js'
		  		},
		  		trip:{
		  			cwd: './lib/Source/',
		  			src: ['Musafir.trip.configuration.js', 'Musafir.trip.utility.js', 'Musafir.trip.model.Flight.js', 'Musafir.trip.view.Flight.js', 'Musafir.trip.view.Flights.js', 'Musafir.trip.collection.Flight.js', 'Musafir.trip.model.Hotel.js', 'Musafir.trip.view.Hotel.js', 'Musafir.trip.view.HotelDetail.js', 'Musafir.trip.view.HotelDetailRoom.js', 'Musafir.trip.view.Hotels.js', 'Musafir.trip.collection.Hotel.js', 'Musafir.trip.ui.js'],
		  			pack: true,
		  			banners: true,
		  			action: 'write', // 'write', 'append', 'prepend'
		  			dest: './dist/musafir.trip.js'
		  		}
		  	}
	  	}

	});

	// Load all required tasks from tasks folder
	grunt.loadTasks('tasks');

	// Load external tasks
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('dist', ['packit:dev', 'packit:dist']);
	grunt.registerTask('default', 'dist');

};

