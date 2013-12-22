module.exports = function(grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({
    jasmine: {
      src: "lib/**/*.js",
      options: {
        specs: "tests/**/*.js"
      },
    },
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "tests/**/*.js", "lib/**/*.js"]
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");

  // Default task
  grunt.registerTask("default", ["jshint", "jasmine"]);
};
