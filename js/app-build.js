var paidRequire = require.config({
//    baseUrl: 'http://graphics8.nytimes.com/ads/paidpost/google/js',
    baseUrl: 'js/',
    appDir: '../',
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
        jquery: './lib/jquery.min',
        backbone: './lib/backbone-min',
        underscore: './lib/underscore-min'
    }
});

paidRequire(['underscore', 'backbone', 'jquery', 'VHS'], function (_, Backbone, $, VHS) {

    'use strict';

    var dispatch = _.clone(Backbone.Events);
;
})();