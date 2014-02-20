module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    jasmine: {
      src: "lib/**/*.js",
      options: {
        specs: "spec/**/*.js"
      },
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      all: ["Gruntfile.js", "spec/**/*.js", "lib/**/*.js"]
    },

    uglify: {
      target: {
        files: {
          "output.min.js": ["lib/doublescore.js"]
        }
      }
    },

    watch: {
      scripts: {
        files: ["Gruntfile.js", "lib/**/*.js", "spec/**/*.js"],
        tasks: ["jasmine"]
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  // Default task
  grunt.registerTask("default", ["jshint", "jasmine"]);
};
