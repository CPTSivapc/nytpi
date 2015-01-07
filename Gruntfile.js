module.exports = function (grunt) {



    var client = "Client", // client name readable
        clientPath = "client", // client name used in path
        projectPath = "title-of-project", // following scoop's rules for urls
        jsVersion = '1\.00', // escaped for regex
        cssVersion = '1\.00';  // escaped for regex
        grunt.jsVersion = jsVersion;


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    //let's load the server package
    grunt.loadNpmTasks('grunt-serve');

    var sources = [];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            libs: {
                src: [
                    'js/lib/paidApp.js'
                ],
                dest: 'js/lib-build.js'
            },
            app: {
                src: [
                    'js/src/head.js',
                    'js/lib/three.js',
                    'js/lib/Detector.js',
                    'js/lib/paid-video.js',
                    'js/src/models/**/*.js',
                    'js/src/views/**/*.js',
                    'js/src/app.js',
                    'js/src/tail.js'
                ],
                dest: 'js/app-build-v' + jsVersion + '.js'
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                eqnull: true,
                browser: true,
                node: true,
                nomen: true,
                globals: {
                    jQuery: true,
                    $: true,
                    _: true,
                    Backbone: true
                }
            },
            main: [
                'js/src/**/*.js',
                '!js/src/head.js',
                '!js/src/tail.js',
                'app.js'
            ]
        },
        watch: {
            options:
            {
                livereload:35728
            },
            files: [
                '**/*.js',
                '!node_modules/**/*.js',
                'htmlComponents/body.html',
                '!js/lib/*.js',
                '!js/app-build-v' + jsVersion + '.js',
                '!js/lib-build.js',
                'js/lib/paid-video.js'
            ],
            //nospawn: true,
            tasks: ['default']
        },
        shell: {                                // Task
            listFolders: {                      // Target
                options: {                      // Options
                    stderr: false
                },
                //removing pass of ad-assets since there's no need for it right now.
                //command: './scooper.sh '+adAssetsIndex+'.html'
                command: './scooper.sh "' + client + '" "' + clientPath+ '" "' + projectPath+ '" "' + jsVersion+ '" "' + cssVersion +'"'
            }
        },
        uglify: {
            options:
            {
                mangle: false
            },
            my_target:
            {
                files: {
                'dist/app-build-v<%= grunt.jsVersion %>.min.js': ['js/app-build-v' + jsVersion + '.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'concat:libs', 'concat:app', 'shell']);
};