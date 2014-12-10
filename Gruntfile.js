module.exports = function (grunt) {
    var adAssetsIndex = "ad-assets/index"

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
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
            options:
            {
                livereload:35728
            },
            files: [
                '**/*.js',
                '!node_modules/**/*.js',
                'htmlComponents/**/*.html',
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
                command: './scooper.sh '+adAssetsIndex+'.html'
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'concat:libs', 'concat:app', 'shell']);
};