# grunt-packitjs

This is a grunt plugin to make use of [/packer/](http://dean.edwards.name/packer/) by Dean Edwards to pack javaScript files efficiently.

## Installation

If you use [npm](https://github.com/isaacs/npm):

	npm install grunt-packitjs

If you don't use npm, clone this repository or download the latest version using the GitHub repository Downloads link.

## Usage

Basic packing and concatenating files with default options

```
	packit: {
		options: {
			attribution: true,
			base62: true,
			shrink: false
		},

		target: { //target
			options: {  //default options
				pack: true,
				banners: true,
				action: 'write',
				dest: './out/main.js'
			},
			files: [
				{
					cwd: './in',
					src: '*.js',
					expand: true,
					flatten: true
				}
			]
		}
	}
```

## Options

### attribution
Type: `Boolean`
Default: `true`

Turn on or off attribution at the start of each `dest` file (as defined under target specific options below).


### base62
Type: `Boolean`
Default: `true`

You can specify if base 62 encoding is to be applied or not with a boolean value


### shrink
Type: `Boolean`
Default: `false`

You can specify if variable name shrinking is to be applied or not with a boolean value



## Target-specific options

### dest
Type: `String`
Default: `./test.js`

Single output file with full path relative to project directory.
If not specified, default outputfile will be test.js at the root of project directory.
Currently, packitjs is supporting output into a single file per target.


### pack
Type: `Boolean`
Default: `false`

Disabling this option simply combines the source files into `dest`, without any packing.
If `pack` is enabled, then source files are packed individually based on `base62` and `shrink` conditions, and combined into `dest`


### banners
Type: `Boolean`
Default: `true`

Banners are simple file names added as comments before the file content. If set to true, every file will have a banner before it, else there will simply be file content.


### action
Type: `String`
Default: `write`

Three types of actions are supported: 'write', 'append', and 'prepend'.
* Write - creates a new file at `dest` or overwrite existing file `dest` and file will contain only the output from the specific target.
* Append - reads an existing file `dest` and adds the output from the specific target to the end of file. Existing contents are retained.
* Prepend - reads an existing file `dest` and adds the output from the specific target to the start of file. Existing contents are retained.