module.exports = function( grunt ) {
  grunt.initConfig({
    // package information
    pkg: grunt.file.readJSON( 'package.json' ),

    // config for jshint task
    jshint: {
      options: {
        jshintrc: true
      },
      files: [
        'Gruntfile.js',
        'app/**/*.js',
        'public/assets/js/**/*.js',
        '!public/assets/js/app.js'
      ]
    },

    // less precompilation
    less: {
      // configure for development environment
      dev: {
        files: {
          'public/assets/css/minihower.css': 'public/assets/less/minihower.less'
        }
      },
      // configure for production environment
      prod: {
        options: {
          cleancss: true,
          sourceMap: true
        },
        files: {
          'public/assets/css/minihower.css': 'public/assets/less/minihower.less'
        }
      }
    },

    // run micro webserver for development
    connect: {
      server: {
        options: {
          base: 'public',
          port: 4242,
          useAvailablePort: true
        }
      }
    },

    // compress + concat js
    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: {
          'public/assets/js/app.js': [
            'app/app.js',
            'app/models/**/*.js',
            'app/collections/**/*.js',
            'app/views/**/*.js'
          ]
        }
      },
      prod: {
        options: {
          mangle: true,
          compress: true,
          sourceMap: true
        },
        files: {
          'public/assets/js/app.js': [
            'app/app.js',
            'app/models/**/*.js',
            'app/collections/**/*.js',
            'app/views/**/*.js'
          ]
        }
      }
    },

    // run tasks on file changes
    watch: {
      js: {
        files: [
          'app/**/*.js',
          'public/assets/js/**/*.js',
          '!public/assets/js/app.js'
        ],
        tasks: [ 'jshint', 'uglify:dev' ],
        options: {
          livereload: true
        }
      },
      styles: {
        files: [ 'public/assets/less/**/*.less' ],
        tasks: [ 'less:dev' ],
        options: {
          livereload: true
        }
      }
    },

    // bump version number
    bump: {
      options: {
        files: [ 'package.json', 'bower.json' ],
        commit: true,
        commitMessage: 'Version changed to v%VERSION%',
        commitFiles: [ 'package.json', 'bower.json' ],
        createTag: true,
        tagName: 'v%VERSION%',
        push: false
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-bump' );

  grunt.registerTask( 'default', [ 'serve' ] );
  grunt.registerTask( 'serve', [ 'jshint', 'less:dev', 'uglify:dev', 'connect', 'watch' ] );
  grunt.registerTask( 'test', [ 'jshint' ] );
  grunt.registerTask( 'build', [ 'test', 'less:prod', 'uglify:dev' ] );
};
