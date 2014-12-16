var paidRequire = require.config({
//    baseUrl: 'http://graphics8.nytimes.com/ads/paidpost/google/js',
    baseUrl: './',
    appDir: './',
    context: 'paidpost',
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        VHS: {
            deps: ['jquery'],
            exports: 'VHS'
        }
    },
    paths: {
        VHS:"http://graphics8.nytimes.com/video/vhs/build/vhs-latest.min",
        jquery: 'js/lib/jquery.min',
        backbone: 'js/lib/backbone-min',
        underscore: 'js/lib/underscore-min'
    }
});

paidRequire(['underscore', 'backbone', 'jquery', 'VHS'], function (_, Backbone, $, VHS) {

    'use strict';

    var dispatch = _.clone(Backbone.Events);
;
})();