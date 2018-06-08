/*
 * grunt-dom-massager
 * https://github.com/dlasky/grunt-dom-massager
 *
 * Copyright (c) 2013 Dan Lasky
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		clean: {
			tests: ['tmp'],
		},

		domMassager: {
			read_test: {
				options: {
					writeDom: false,
					selectors: {
						".read .classy": {
							action: "html",
							output: "dom.read.classy"
						},
						".read #idface":{
							action:"text",
							output:"dom.read.idface"
						}
					}
				},
				src:'test/fixtures/test.html'
			},
			write_test: {
				options: {
					writeDom:true,
					selectors: {
						".write #deleteme": {
							action:"remove"
						},
						".write #after": {
							action:"append",
							input:["<a href='blah'></a>"]
						},
						".write #before":{
							action:"prepend",
							input:["<a href='zappo'></a>"]
						},
						".attr #1":{
							action:"addClass",
							input:["test test2"]
						},
						".attr #2":{
							action:"removeClass",
							input:["cake"]
						},
						".attr #3":{
							action:"removeClass",
							input:["cake toast"]
						},
						".attr #4":{
							action:"attr",
							input:["data-test","testFace"]
						},
						".append .me": {
							action:"remove"
						},
						".append .you": {
							action:"append",
							input:["<a href='blah'></a>"]
						}
					}
				},
				files: {
					'tmp/': ['test/fixtures/test.html'],
				},
			},
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'domMassager', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);
	// grunt.registerTask('default', ['dom_massager']);

};
