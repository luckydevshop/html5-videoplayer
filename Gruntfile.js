"use strict";

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                unused: true,
                browser : true,
                devel : true,
                eqeqeq : true,
                indent : 4,
                strict : true,
                node : true,
                nomen : false,
                globals: {
                    window: true,
                    "$": true,
                    jQuery: true
                }
            },
            defaults: ['public/assets/js/*.js']
        },

        notify: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'Grunt Options '
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-notify');

    runt.registerTask('default', ['jshint', 'notify']);
};
