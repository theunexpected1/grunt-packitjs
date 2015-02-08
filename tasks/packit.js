module.exports = function(grunt){

	grunt.registerMultiTask('packit', 'Pack files', function(){
		// Algorithm / steps:
		// 0. prepare / log processing time // 0 actions are not sequential
		// 1. Get options
		// 2. Perform JS packing conditionally, start with looping through JS files object
		// 2.1 loop through individual files
		// 2.1.1 grab contents
		// 2.1.2 conditionally prepare banner
		// 2.1.3 conditionally compress the file
		// 2.2 conditionally write to file
		// 2.2.1 as new file
		// 2.2.2 or append contents to existing file
		// 2.2.3 or prepend contents to existing file

		// ~0 log processing time
		var startTime = (new Date()).getTime(),
		pkg = grunt.file.readJSON(__dirname + "/../package.json");
		var banner = '/*! ' + (pkg.title || pkg.name) + ' - v' + pkg.version + ' - ' + '' + grunt.template.today("yyyy-mm-dd") + '\n' + '' + '' + ' * Copyright (c) ' + grunt.template.today("yyyy") + ' ' + pkg.author.name + " <" + pkg.author.email + '>; */\n';
		
		// 1. Get options
		var options = this.options({
			attribution: true,
			base62: true,
			shrink: false
		}),

			data = this.data.options, // data is target's data
			fullFile = "",
			packer = require('packer');		// pre-requisite libraries 
		var action = data.action || "write"; // setting default action
		var dest = data.dest || "./test.js";

		// 2. Perform JS packing conditionally, start with looping through JS files object
		this.files.forEach(function(file) {
		
			// 2.1 loop through individual files
			file.src.forEach(function(path){
				// 2.1.1 grab contents
				var fileContent = grunt.file.read(path),
				fileName = path.substr(path.lastIndexOf("/") + 1);

				// 2.1.2 conditionally prepare banner
				var comment = "";
				if(data.banners){
					comment = "/**" + "\n" + fileName + "\n" + "**/" + "\n";
				}

				// 2.1.3 conditionally compress the file
				if(data.pack){
					try{
						fileContent = packer.pack(fileContent, 'Normal', options.base62, options.shrink);
					} catch (e){
						grunt.log.warn("Packing failed; just combining file(s)");
					}
				}
				fullFile += comment + fileContent + "\n\n";
			});

		});

		// 2.2 conditionally write as new file, or append/prepend to existing file
		var fileContentBuffer = ""; // We use this buffer variable to optimize the speed of packing
		switch(action){
			case "write":
				// 2.2.1 as new file
				if(options.attribution){
					fullFile = banner + "\n" + fullFile;
				}
				grunt.file.write(dest, fullFile);
				grunt.log.ok("Created " + dest);
				break;
			case "append":
				// 2.2.2 or append contents to existing file
				if(grunt.file.exists(dest)){
					 fileContentBuffer += "\n\n" + grunt.file.read(dest);
				}
				fileContentBuffer += fullFile;

				if(options.attribution){
					fileContentBuffer = banner + "\n" + fileContentBuffer;
				}
				grunt.file.write(dest, fileContentBuffer);
				grunt.log.ok("Updated " + dest);
				break;
			case "prepend":
				// 2.2.3 or prepend contents to existing file
				if(grunt.file.exists(dest)){
					 fileContentBuffer += "\n\n" + grunt.file.read(dest);
				}
				fileContentBuffer = fullFile + "\n\n" + fileContentBuffer;

				if(options.attribution){
					fileContentBuffer = banner + "\n" + fileContentBuffer;
				}
				grunt.file.write(dest, fileContentBuffer);
				grunt.log.ok("Updated " + dest);
				break;
			default:
				grunt.log.ok("Action " + action + " is not supported");
				break;
		}

		// 0. prepare / log processing time
		var endTime = (new Date()).getTime();
		var diffTime = ((endTime - startTime) / 1000);
		grunt.log.ok("\nin " + diffTime + " " + grunt.util.pluralize(diffTime, "second/seconds"));
	});

};