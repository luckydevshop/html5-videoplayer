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
            defaults: ['src/*.js']
        },

        uglify: {
            target: {
                options: {
                    banner: '/*!\r\n * <%= pkg.name %> \r\n * version: <%= pkg.version %> \r\n * build date: <%= grunt.template.today("yyyy-mm-dd") %> \r\n */\r\n',
                    mangle: true,
                    compress: true,
                    report: 'gzip',
                    sourceMap: true
                },
                files: {
                    'dist/video-player.min.js': ['src/video-player.js']
                }
            }
        },

        csslint: {
            defaults: {
                src: ['src/video-player.css']
            }
        },

        autoprefixer: {
            dist: {
                files: {
                    'dist/video-player.css': 'src/video-player.css'
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '/*!\r\n * <%= pkg.name %> \r\n * version: <%= pkg.version %> \r\n * build date: <%= grunt.template.today("yyyy-mm-dd") %> \r\n */',
                },
                files: {
                    'dist/video-player.min.css': ['dist/video-player.css']
                }
            }
        },

        compress: {
            defaults: {
                options: {
                    archive: 'html5-videoplayer.zip'
                },
                files: [
                    {
                        src: ['src/*'],
                        desc: 'html5-videoplayer',
                        filter: 'isFile'
                    }
                ]
            }
        },

        watch: {
            styles: {
                files: ['dist/video-player.css'],
                tasks: ['autoprefixer']
            }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('default', ['jshint', 'uglify', 'csslint', 'autoprefixer', 'cssmin', 'compress', 'notify']);
};
