module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-shell');

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
                dest: 'js/app-build.js'
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
            files: [
                '**/*.js',
                '!node_modules/**/*.js',
                'body.html',
                '!js/lib/*.js',
                '!js/app-build.js',
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
                command: './scooper.sh paid-post-name.html'
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'concat:libs', 'concat:app', 'shell']);

};