module.exports = function(grunt) {
  "use strict";

  // Project configuration
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js"]
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Default task
  grunt.registerTask("default", ["jshint"]);
};
